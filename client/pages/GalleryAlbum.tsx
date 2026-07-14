import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./footer";
import { getGalleryAlbumById, type GalleryAlbum, type GalleryPhoto } from "../data/gallery";
import { ArrowLeft, X } from "lucide-react";

export default function GalleryAlbumPage() {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<GalleryAlbum | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getGalleryAlbumById(id);
        if (!data || !data.published) {
          setNotFound(true);
          setAlbum(null);
        } else {
          setAlbum(data);
          setNotFound(false);
        }
      } catch (error) {
        console.error("Failed to load album:", error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePhoto(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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

      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-[#F84988] hover:text-[#e03a7a] mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Link>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-[#F84988] mb-4" />
              <p className="font-helvetica text-black/70">Loading album...</p>
            </div>
          ) : notFound || !album ? (
            <div className="text-center py-24 bg-white/50 rounded-3xl">
              <h1 className="font-playfair text-4xl font-bold text-black mb-3">
                Album not found
              </h1>
              <p className="font-helvetica text-black/70 mb-6">
                This collection may have been removed or is not published yet.
              </p>
              <Link
                to="/gallery"
                className="inline-flex rounded-full bg-[#F84988] text-white px-6 py-3 font-inter font-semibold hover:bg-[#e03a7a]"
              >
                Return to Gallery
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-3">
                  {album.archived && (
                    <span className="rounded-full bg-[#741C82]/10 text-[#741C82] px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                      Archive
                    </span>
                  )}
                  {album.eventDate && (
                    <span className="font-helvetica text-sm text-black/60">
                      {formatDate(album.eventDate)}
                    </span>
                  )}
                </div>
                <h1 className="font-charm text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-none mb-4">
                  {album.title}
                </h1>
                {album.description && (
                  <p className="font-playfair text-lg sm:text-xl text-black/75 max-w-3xl">
                    {album.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {album.photos.map((photo) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setActivePhoto(photo)}
                    className="group text-left overflow-hidden rounded-2xl bg-white/70 border border-white/70 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-black/5">
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-playfair text-lg font-semibold text-black group-hover:text-[#F84988] transition-colors">
                        {photo.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {activePhoto && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.name}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white hover:text-white/80"
            onClick={() => setActivePhoto(null)}
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>
          <div
            className="max-w-5xl w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activePhoto.url}
              alt={activePhoto.name}
              className="w-full max-h-[80vh] object-contain rounded-xl bg-black/40"
            />
            <p className="mt-4 text-center font-playfair text-xl sm:text-2xl text-white">
              {activePhoto.name}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
