import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./footer";
import {
  getPublishedGalleryAlbums,
  type GalleryAlbum,
} from "../data/gallery";
import { Archive, Images } from "lucide-react";

export default function Gallery() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"current" | "archive">("current");

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await getPublishedGalleryAlbums();
        setAlbums(data);
      } catch (error) {
        console.error("Failed to load gallery:", error);
        setAlbums([]);
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, []);

  const currentAlbums = useMemo(
    () => albums.filter((album) => !album.archived),
    [albums],
  );
  const archivedAlbums = useMemo(
    () => albums.filter((album) => album.archived),
    [albums],
  );

  const visibleAlbums = view === "current" ? currentAlbums : archivedAlbums;

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gradient-to-r from-[#F1E6DB] via-[#E0B2F1] to-[#FFE4EE] min-h-screen">
      <Header whiteText={true} />

      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 w-full h-[120%] -translate-y-[10%]"
            style={{
              backgroundImage:
                "url(https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0235.jpg?alt=media&token=a5612b0e-c68f-428f-8179-e9f4fdeee5ff)",
              backgroundSize: "cover",
              backgroundPosition: "center 20%",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>
      </section>

      <div className="relative z-10 text-center px-4 mt-[-8%] sm:mt-[-6%] mb-10">
        <h1 className="font-charm text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold text-black leading-none">
          Gallery
        </h1>
        <p className="font-playfair text-lg sm:text-2xl text-black/80 mt-3 max-w-2xl mx-auto">
          Moments from events, gatherings, and milestones — kept and accessible.
        </p>
      </div>

      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              type="button"
              onClick={() => setView("current")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-inter text-sm font-semibold transition-colors ${
                view === "current"
                  ? "bg-[#F84988] text-white"
                  : "bg-white/70 text-black hover:bg-white"
              }`}
            >
              <Images className="h-4 w-4" />
              Current ({currentAlbums.length})
            </button>
            <button
              type="button"
              onClick={() => setView("archive")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-inter text-sm font-semibold transition-colors ${
                view === "archive"
                  ? "bg-[#741C82] text-white"
                  : "bg-white/70 text-black hover:bg-white"
              }`}
            >
              <Archive className="h-4 w-4" />
              Archive ({archivedAlbums.length})
            </button>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-[#F84988] mb-4" />
              <p className="font-helvetica text-black/70">Loading gallery...</p>
            </div>
          ) : visibleAlbums.length === 0 ? (
            <div className="text-center py-20 bg-white/50 rounded-3xl border border-white/60">
              <h2 className="font-playfair text-3xl font-bold text-black mb-3">
                {view === "current" ? "No current albums yet" : "Archive is empty"}
              </h2>
              <p className="font-helvetica text-black/70 max-w-lg mx-auto">
                {view === "current"
                  ? "New event photos will appear here once they are published."
                  : "Past event albums will live here so they stay easy to revisit."}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {visibleAlbums.map((album) => (
                <Link
                  key={album.id}
                  to={`/gallery/${album.id}`}
                  className="group block overflow-hidden rounded-2xl bg-white/70 border border-white/70 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-black/5">
                    <img
                      src={album.coverImage || album.photos[0]?.url || "/placeholder.svg"}
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <p className="font-helvetica text-xs uppercase tracking-wider text-[#F84988]">
                        {formatDate(album.eventDate) || "Event"}
                      </p>
                      <span className="font-helvetica text-xs text-black/50">
                        {album.photos.length} photo{album.photos.length === 1 ? "" : "s"}
                      </span>
                    </div>
                    <h2 className="font-playfair text-2xl font-bold text-black leading-tight mb-2 group-hover:text-[#F84988] transition-colors">
                      {album.title}
                    </h2>
                    {album.description && (
                      <p className="font-helvetica text-sm text-black/70 line-clamp-2">
                        {album.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
