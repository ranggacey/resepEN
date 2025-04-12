export default function HeroSection() {
    return (
      <div
        className="relative w-full h-[70vh] md:h-[80vh] bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
      >
        {/* Overlay gelap transparan */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        {/* Teks Hero */}
        <div className="relative z-10 text-center px-4 animate-fadeIn">
          <h1 className="text-3xl md:text-6xl font-pixel text-white mb-4">
            Selamat Datang di MyGameRPG
          </h1>
          <p className="text-base md:text-xl text-white max-w-3xl mx-auto">
            Jelajahi dunia petualangan yang penuh misteri, tantangan, dan cerita
            epik. Pilih petualanganmu dan mulai perjalanan!
          </p>
          <a
            href="#stories"
            className="mt-8 inline-block px-6 py-3 bg-neon text-black rounded-full font-semibold hover:bg-neon/80 transition-all duration-300 shadow-lg"
          >
            Mulai Petualangan
          </a>
        </div>
      </div>
    );
  }
  