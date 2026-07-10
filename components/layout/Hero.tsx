import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[200px] md:h-[280px] lg:h-[420px] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] via-[#2B5588] to-[#1E3A5F]" />

      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/hero-bg.jpg"
          alt="TJermin Store"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-[48px] font-semibold text-white tracking-tight leading-tight mb-2 md:mb-4">
          Tjermin Marketplace
        </h2>
        <p className="text-sm md:text-base lg:text-xl text-white/90 max-w-[560px]">
          Find your perfect match with ease
        </p>
      </div>
    </section>
  );
}
