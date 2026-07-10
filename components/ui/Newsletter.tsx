export default function Newsletter() {
  return (
    <section className="bg-[#F8FAFC] py-10 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[215px] text-center">
        <h3 className="text-xl md:text-2xl lg:text-[30px] font-semibold text-heading tracking-wide mb-3 md:mb-4">
          Stay Updated
        </h3>
        <p className="text-sm md:text-base text-[#64748B] mb-6 md:mb-8 max-w-[560px] mx-auto">
          Subscribe to receive notifications about new inventory and special offers.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-[448px] mx-auto">
          <input
            type="email"
            placeholder="Email address"
            className="w-full sm:flex-[313] h-11 md:h-12 px-4 border border-[#CBD5E1] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button className="w-full sm:w-[123px] h-11 md:h-12 bg-primary text-white text-sm md:text-base font-medium rounded-[10px] hover:bg-primary-dark transition-colors flex-shrink-0">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
