import { useEffect, useMemo, useState } from "react";
import {
  addGalleryAlbum,
  createPhotoId,
  deleteGalleryAlbum,
  getAllGalleryAlbums,
  updateGalleryAlbum,
  type GalleryAlbum,
  type GalleryPhoto,
} from "../data/gallery";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Switch } from "./ui/switch";
import { toast } from "./ui/use-toast";
import { Archive, Pencil, Plus, Trash2 } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface GalleryFormData {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  eventDate: string;
  photos: GalleryPhoto[];
  archived: boolean;
  published: boolean;
}

const initialFormData: GalleryFormData = {
  id: "",
  title: "",
  description: "",
  coverImage: "",
  eventDate: new Date().toISOString().split("T")[0],
  photos: [],
  archived: false,
  published: true,
};

interface GalleryAdminProps {
  isActive: boolean;
}

export default function GalleryAdmin({ isActive }: GalleryAdminProps) {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterView, setFilterView] = useState<"all" | "current" | "archived">("all");
  const [form, setForm] = useState<GalleryFormData>(initialFormData);
  const [pendingPhotoUrl, setPendingPhotoUrl] = useState("");
  const [pendingPhotoName, setPendingPhotoName] = useState("");

  const loadAlbums = async () => {
    setIsLoading(true);
    try {
      const data = await getAllGalleryAlbums();
      setAlbums(data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load gallery albums.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isActive) {
      void loadAlbums();
    }
  }, [isActive]);

  const filteredAlbums = useMemo(() => {
    return albums.filter((album) => {
      const matchesSearch =
        album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.photos.some((photo) =>
          photo.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesFilter =
        filterView === "all" ||
        (filterView === "current" && !album.archived) ||
        (filterView === "archived" && album.archived);

      return matchesSearch && matchesFilter;
    });
  }, [albums, searchQuery, filterView]);

  const resetForm = () => {
    setForm(initialFormData);
    setEditingId(null);
    setShowForm(false);
    setPendingPhotoUrl("");
    setPendingPhotoName("");
  };

  const handleEdit = (album: GalleryAlbum) => {
    setForm({
      id: album.id,
      title: album.title,
      description: album.description,
      coverImage: album.coverImage,
      eventDate: album.eventDate,
      photos: album.photos,
      archived: album.archived,
      published: album.published,
    });
    setEditingId(album.id);
    setShowForm(true);
  };

  const handleAddPhoto = () => {
    if (!pendingPhotoUrl.trim()) {
      toast({
        title: "Photo required",
        description: "Upload or paste a photo URL before adding it.",
        variant: "destructive",
      });
      return;
    }

    const nextPhoto: GalleryPhoto = {
      id: createPhotoId(),
      url: pendingPhotoUrl.trim(),
      name: pendingPhotoName.trim() || `Photo ${form.photos.length + 1}`,
      sortOrder: form.photos.length,
    };

    setForm((prev) => ({
      ...prev,
      photos: [...prev.photos, nextPhoto],
      coverImage: prev.coverImage || nextPhoto.url,
    }));
    setPendingPhotoUrl("");
    setPendingPhotoName("");
  };

  const handlePhotoNameChange = (photoId: string, name: string) => {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.map((photo) =>
        photo.id === photoId ? { ...photo, name } : photo,
      ),
    }));
  };

  const handleRemovePhoto = (photoId: string) => {
    setForm((prev) => {
      const photos = prev.photos
        .filter((photo) => photo.id !== photoId)
        .map((photo, index) => ({ ...photo, sortOrder: index }));
      const removedWasCover = prev.photos.find((p) => p.id === photoId)?.url === prev.coverImage;
      return {
        ...prev,
        photos,
        coverImage: removedWasCover ? photos[0]?.url || "" : prev.coverImage,
      };
    });
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast({
        title: "Title required",
        description: "Please name this album (e.g. Foundation Gala 2026).",
        variant: "destructive",
      });
      return;
    }

    if (form.photos.length === 0) {
      toast({
        title: "Photos required",
        description: "Add at least one named photo to this album.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        await updateGalleryAlbum({
          id: editingId,
          title: form.title.trim(),
          description: form.description.trim(),
          coverImage: form.coverImage || form.photos[0]?.url || "",
          eventDate: form.eventDate,
          photos: form.photos,
          archived: form.archived,
          published: form.published,
          createdAt: albums.find((a) => a.id === editingId)?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        toast({ title: "Saved", description: "Album updated successfully." });
      } else {
        await addGalleryAlbum({
          title: form.title.trim(),
          description: form.description.trim(),
          coverImage: form.coverImage || form.photos[0]?.url || "",
          eventDate: form.eventDate,
          photos: form.photos,
          archived: form.archived,
          published: form.published,
        });
        toast({ title: "Created", description: "Album published to the gallery." });
      }

      await loadAlbums();
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save album.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (albumId: string) => {
    try {
      await deleteGalleryAlbum(albumId);
      await loadAlbums();
      toast({ title: "Deleted", description: "Album removed from the gallery." });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete album.",
        variant: "destructive",
      });
    }
  };

  const handleToggleArchive = async (album: GalleryAlbum) => {
    try {
      await updateGalleryAlbum({
        ...album,
        archived: !album.archived,
      });
      await loadAlbums();
      toast({
        title: album.archived ? "Restored" : "Archived",
        description: album.archived
          ? "Album moved back to current galleries."
          : "Album moved to the archive. It remains publicly viewable.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Could not update archive status.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F84988] mb-4" />
        <p className="font-helvetica text-black/70">Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <Button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-[#F84988] text-white hover:bg-[#e03a7a] flex items-center gap-2"
        >
          <Plus size={16} />
          Create Album
        </Button>

        <div className="flex gap-3 flex-wrap">
          <Input
            type="text"
            placeholder="Search albums or photo names..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <div className="flex gap-2">
            {(["all", "current", "archived"] as const).map((view) => (
              <Button
                key={view}
                type="button"
                variant={filterView === view ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterView(view)}
                className={
                  filterView === view
                    ? "bg-[#F84988] text-white hover:bg-[#e03a7a]"
                    : "border-[#F84988] text-[#F84988]"
                }
              >
                {view === "all" ? "All" : view === "current" ? "Current" : "Archive"}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredAlbums.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <h3 className="font-playfair text-2xl font-bold text-black mb-2">
                No albums found
              </h3>
              <p className="font-helvetica text-black/70 mb-4 text-center max-w-md">
                {albums.length === 0
                  ? "Create your first event album, upload photos, and name each one."
                  : "Try adjusting your search or filter."}
              </p>
              <Button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="bg-[#F84988] text-white hover:bg-[#e03a7a]"
              >
                <Plus size={16} className="mr-2" />
                Create Album
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredAlbums.map((album) => (
            <Card key={album.id} className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-48 flex-shrink-0">
                    <img
                      src={album.coverImage || album.photos[0]?.url || "/placeholder.svg"}
                      alt={album.title}
                      className="w-full h-32 lg:h-40 object-cover bg-white rounded-lg"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge className="bg-[#F84988] text-white">
                            {album.photos.length} photo{album.photos.length === 1 ? "" : "s"}
                          </Badge>
                          {album.archived ? (
                            <Badge variant="outline" className="border-amber-600 text-amber-700">
                              Archive
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-green-600 text-green-700">
                              Current
                            </Badge>
                          )}
                          {!album.published && (
                            <Badge variant="outline" className="border-gray-500 text-gray-600">
                              Draft
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-playfair text-xl font-bold text-black mb-2 truncate">
                          {album.title}
                        </h3>
                        <p className="font-helvetica text-sm text-black/70 mb-2 line-clamp-2">
                          {album.description || "No description"}
                        </p>
                        <p className="text-xs text-black/50">{formatDate(album.eventDate)}</p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleArchive(album)}
                          className="border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white"
                          title={album.archived ? "Move to current" : "Move to archive"}
                        >
                          <Archive size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(album)}
                          className="border-[#F84988] text-[#F84988] hover:bg-[#F84988] hover:text-white"
                        >
                          <Pencil size={14} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Album</AlertDialogTitle>
                              <AlertDialogDescription>
                                Delete &quot;{album.title}&quot; and all of its photos from the
                                gallery? This cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(album.id)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={showForm} onOpenChange={(open) => (!open ? resetForm() : setShowForm(true))}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl">
              {editingId ? "Edit Album" : "Create Album"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="album-title">Album / Event Name *</Label>
                <Input
                  id="album-title"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Foundation Scholarship Awards 2026"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="album-date">Event Date</Label>
                <Input
                  id="album-date"
                  type="date"
                  value={form.eventDate}
                  onChange={(e) => setForm((prev) => ({ ...prev, eventDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="album-description">Description</Label>
              <Textarea
                id="album-description"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="A short note about this event or collection"
                rows={3}
              />
            </div>

            <ImageUpload
              label="Cover Image (optional — defaults to first photo)"
              value={form.coverImage}
              onChange={(url) => setForm((prev) => ({ ...prev, coverImage: url }))}
              storagePrefix="uploads/gallery/covers/"
              placeholder="Upload a cover image or paste a URL"
            />

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.published}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, published: checked }))
                  }
                />
                <Label>Published (visible on site)</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.archived}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, archived: checked }))
                  }
                />
                <Label>Archive (past events — still accessible)</Label>
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <h4 className="font-playfair text-xl font-semibold">Photos</h4>
              <p className="font-helvetica text-sm text-black/60">
                Upload each photo and give it a name so visitors can identify moments from the event.
              </p>

              <div className="rounded-xl border border-[#F84988]/20 bg-[#FFE4EE]/40 p-4 space-y-4">
                <ImageUpload
                  label="Add Photo"
                  value={pendingPhotoUrl}
                  onChange={setPendingPhotoUrl}
                  storagePrefix="uploads/gallery/photos/"
                  placeholder="Upload or paste photo URL"
                />
                <div className="space-y-2">
                  <Label htmlFor="photo-name">Photo Name *</Label>
                  <Input
                    id="photo-name"
                    value={pendingPhotoName}
                    onChange={(e) => setPendingPhotoName(e.target.value)}
                    placeholder="e.g. Opening prayer, Scholarship recipients"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleAddPhoto}
                  className="bg-[#F84988] text-white hover:bg-[#e03a7a]"
                >
                  <Plus size={16} className="mr-2" />
                  Add Photo to Album
                </Button>
              </div>

              {form.photos.length > 0 && (
                <div className="grid gap-4">
                  {form.photos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className="flex flex-col sm:flex-row gap-4 items-start border rounded-lg p-3 bg-white"
                    >
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="w-full sm:w-28 h-28 object-cover rounded-md"
                      />
                      <div className="flex-1 w-full space-y-2">
                        <Label>Photo name</Label>
                        <Input
                          value={photo.name}
                          onChange={(e) => handlePhotoNameChange(photo.id, e.target.value)}
                          placeholder={`Photo ${index + 1}`}
                        />
                        <p className="text-xs text-black/50 truncate">{photo.url}</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#F84988] text-white hover:bg-[#e03a7a]"
              >
                {isSaving ? "Saving..." : editingId ? "Save Changes" : "Create Album"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
