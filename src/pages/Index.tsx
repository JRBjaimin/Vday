import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, Upload, X } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import HeroSection from "@/components/HeroSection";
import FooterSection from "@/components/FooterSection";
import LoveLetterSection from "@/components/LoveLetterSection";
import SingleMode from "@/pages/SingleMode";

const Index = () => {
  const [singleMode, setSingleMode] = useState(false);
  const [showSingleModal, setShowSingleModal] = useState(false);
  const [customSongFile, setCustomSongFile] = useState<File | null>(null);
  const [customSongUrl, setCustomSongUrl] = useState<string | null>(null);
  const [isDraggingSong, setIsDraggingSong] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (customSongUrl) {
        URL.revokeObjectURL(customSongUrl);
      }
    };
  }, [customSongUrl]);

  const handleSingleModeTap = () => {
    setShowSingleModal(true);
  };

  const closeSingleModal = () => {
    setShowSingleModal(false);
  };

  const setSelectedSong = (file?: File | null) => {
    if (!file) {
      return;
    }

    if (file.type !== "audio/mpeg") {
      return;
    }

    if (customSongUrl) {
      URL.revokeObjectURL(customSongUrl);
    }

    const songUrl = URL.createObjectURL(file);
    setCustomSongFile(file);
    setCustomSongUrl(songUrl);
  };

  const handleSongSelection = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedSong(event.target.files?.[0]);
  };

  const handleSongDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingSong(false);
    setSelectedSong(event.dataTransfer.files?.[0]);
  };

  const enterSingleMode = () => {
    setShowSingleModal(false);
    setSingleMode(true);
  };

  const handleSkip = () => {
    setCustomSongFile(null);
    if (customSongUrl) {
      URL.revokeObjectURL(customSongUrl);
      setCustomSongUrl(null);
    }
    setShowSingleModal(false);
    setSingleMode(true);
  };

  const handleBackFromSingleMode = () => {
    setSingleMode(false);
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <AnimatePresence mode="wait">
        {singleMode ? (
          <SingleMode key="single" onBack={handleBackFromSingleMode} songUrl={customSongUrl} />
        ) : (
          <motion.div
            key="valentine"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
          >
            <FloatingHearts />
            <HeroSection onToggleSingle={handleSingleModeTap} />
            <LoveLetterSection />
            <FooterSection />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSingleModal && !singleMode && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSingleModal}
            />

            <motion.div
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-fuchsia-700/30 via-slate-900/90 to-cyan-700/30 p-6 text-white shadow-[0_0_70px_rgba(217,70,239,0.35)]"
              initial={{ scale: 0.82, opacity: 0, y: 50, rotateX: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 180, damping: 16 }}
            >
              <motion.div
                className="pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-fuchsia-500/40 blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.7, 0.35] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-cyan-400/40 blur-3xl"
                animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.35, 0.75, 0.35] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />

              <button
                type="button"
                onClick={closeSingleModal}
                className="absolute right-3 top-3 rounded-full border border-white/20 bg-white/10 p-2 text-white/80 transition hover:bg-white/20 hover:text-white"
                aria-label="Close single mode modal"
              >
                <X size={18} />
              </button>

              <motion.div
                className="relative z-10 mb-6 text-center"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-200/60 bg-cyan-300/15">
                  <Music size={28} className="text-cyan-100" />
                </div>
                <h2 className="text-3xl font-black tracking-wide">Single Mode Suite</h2>
                <p className="mt-2 text-sm text-white/80">
                  Add your own MP3 track (optional), then enter the party.
                </p>
              </motion.div>

              <motion.div
                className="relative z-10 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".mp3,audio/mpeg"
                  className="hidden"
                  onChange={handleSongSelection}
                />

                <div
                  onDrop={handleSongDrop}
                  onDragOver={(event) => event.preventDefault()}
                  onDragEnter={(event) => {
                    event.preventDefault();
                    setIsDraggingSong(true);
                  }}
                  onDragLeave={(event) => {
                    event.preventDefault();
                    setIsDraggingSong(false);
                  }}
                  className={`rounded-2xl border-2 border-dashed px-3 py-3 transition ${
                    isDraggingSong
                      ? "border-cyan-300 bg-cyan-300/15"
                      : "border-fuchsia-300/60 bg-fuchsia-400/10"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="group flex w-full items-center justify-center gap-3 rounded-xl border border-fuchsia-300/60 bg-fuchsia-400/15 px-4 py-4 font-semibold text-white transition hover:bg-fuchsia-300/25"
                  >
                    <Upload size={18} className="transition group-hover:scale-110" />
                    Add Song (MP3)
                  </button>
                  <p className="mt-2 text-center text-xs text-white/75">
                    Drag & drop MP3 here, or click to browse
                  </p>
                </div>

                <motion.div
                  className="rounded-xl border border-white/15 bg-black/35 px-4 py-3 text-sm"
                  animate={{ borderColor: customSongFile ? "rgba(34,211,238,0.9)" : "rgba(255,255,255,0.2)" }}
                >
                  {customSongFile ? (
                    <p className="truncate text-cyan-200">Selected: {customSongFile.name}</p>
                  ) : (
                    <p className="text-white/70">No custom song selected. Default song will play.</p>
                  )}
                </motion.div>

                <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-semibold text-white/90 transition hover:bg-white/20"
                  >
                    Skip
                  </button>
                  <button
                    type="button"
                    onClick={enterSingleMode}
                    className="rounded-xl border border-cyan-200/60 bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-3 font-black text-slate-950 transition hover:brightness-110"
                  >
                    Submit & Enter
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
