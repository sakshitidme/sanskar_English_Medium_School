import heroVideo from "../assets/videos/herovideo.mp4";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--color-green-light)]">
      {/* Curved background */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 w-[85%] h-full bg-[var(--color-green-main)] rounded-bl-[300px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-40 grid md:grid-cols-2 items-center">
        
        {/* LEFT CONTENT */}
        <div className="text-white">
               
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
  <span className="inline-block animate-word delay-1">Successful</span>{" "}
  <span className="inline-block animate-word delay-2">education</span>{" "}
  <span className="inline-block animate-word delay-3">starts</span>
  <br />
  <span className="inline-block animate-word delay-4">with</span>{" "}
  <span className="inline-block animate-word delay-5 text-[var(--color-yellow)]">
    a good education!
  </span>
</h1>


          {/* yellow underline */}
          <div className="w-10 h-1 bg-[var(--color-yellow)] rounded-full mt-6"></div>

          <button className="mt-10 bg-[var(--color-yellow)] text-black px-8 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition">
            Discover More
          </button>
        </div>

        {/* RIGHT VIDEO */}
        <div className="relative flex justify-center items-center mt-16 md:mt-0">
          {/* dashed circle */}
          <div className="absolute w-[320px] h-[320px] md:w-[480px] md:h-[480px] border-2 border-dashed border-white/40 rounded-full animate-spin-slow"></div>

          {/* floating icons */}
          <div className="absolute -left-6 bottom-20 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold animate-bounce">
            ABC
          </div>

          <div className="absolute right-10 top-24 w-12 h-12 bg-[var(--color-yellow)] rounded-full animate-pulse"></div>
          <div className="absolute right-0 bottom-28 w-12 h-12 bg-blue-500 rounded-full animate-ping"></div>

          {/* VIDEO CIRCLE */}
          <div
            className="relative z-10 w-[260px] h-[260px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden shadow-2xl"
            style={{ animation: "floatSlow 5s ease-in-out infinite" }}
          >
            <video
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
