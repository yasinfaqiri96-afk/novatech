import Image from "next/image";
import ViewportMotion from "./ViewportMotion";

/**
 * Logos of businesses Novatech has worked with, from `public/images/client`.
 * Each caption is the name or activity printed on the logo artwork itself
 * (read from the file, not assumed). Two marks carry no legible name, so they
 * stay uncaptioned rather than being given an invented one. The spaced and
 * parenthesised originals were renamed to plain `client-NN.webp`, because the
 * image optimiser double-escaped them into 404s; keep new logos to that pattern.
 */
const clientLogos: { src: string; name?: string }[] = [
  { src: "/images/client/2.webp", name: "Arg Company" },
  { src: "/images/client/4.webp", name: "Mirwais Yaqoobi Diagnostic Center" },
  { src: "/images/client/5.webp", name: "قادری" },
  { src: "/images/client/6.webp", name: "Manoto Potato Chips" },
  { src: "/images/client/9a.webp", name: "Super Cola" },
  { src: "/images/client/12.webp", name: "مرکز جلدی و زیبایی" },
  { src: "/images/client/13.webp" },
  { src: "/images/client/14.webp", name: "شرکت نرم افزاری" },
  { src: "/images/client/15.webp", name: "انستیتوت علوم صحی طلوع سعادت" },
  { src: "/images/client/16.webp" },
  { src: "/images/client/17.webp", name: "Qaderi" },
  { src: "/images/client/77.webp", name: "گیلاتو؛ بستنی و فست فود" },
  { src: "/images/client/200.webp", name: "خیاطی نوراحمد سلیمانی" },
  { src: "/images/client/client-18.webp", name: "Telionix" },
  { src: "/images/client/client-19.webp", name: "Pishro" },
  { src: "/images/client/client-20.webp", name: "گروپ کمپنی‌های صدیقی" },
  { src: "/images/client/client-21.webp", name: "زیتون زمرد" },
  { src: "/images/client/client-22.webp", name: "Le Petit Isenburg" },
  { src: "/images/client/client-23.webp", name: "شرکت باربری رحمانی (نور)" },
  { src: "/images/client/client-24.webp", name: "Wesal Travel" },
  { src: "/images/client/client-25.webp", name: "TURD KFC" },
];

export default function ClientLogosSlider() {
  return (
    <ViewportMotion>
    <section
      className="pt-6 pb-16 mt-0 mb-8 lg:pt-8 lg:pb-20 lg:mb-12 bg-white overflow-hidden border-t border-gray-100"
      aria-labelledby="client-logos-title"
    >
      <div className="sm:mx-[130px] mx-[30px] px-auto">
        {/* Section Title */}
        <div className="flex flex-col gap-3 items-center mb-8">
          <h2 id="client-logos-title" className="flex text-[26px] md:text-3xl">
            <span className="heavy">مشتریان</span>{" "}
            <span className="light">ما</span>
          </h2>
          <Image
            src="/images/signature.jpg"
            alt=""
            aria-hidden="true"
            width={129}
            height={19}
            className="flex select-none"
          />
        </div>

        {/* Marquee Wrapper */}
        <div className="relative flex overflow-hidden w-full group py-4" dir="ltr">
          {/* Fading Edges for elegance */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <ul className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-8 md:gap-16 pr-8 md:pr-16 m-0 p-0 list-none">
            {/* The list is rendered twice so a -50% translate loops seamlessly. */}
            {[...clientLogos, ...clientLogos].map((logo, idx) => (
              <li
                key={idx}
                className="client-logo-item flex-shrink-0 flex flex-col items-center gap-2"
                style={{ width: "clamp(8rem, 12vw, 11rem)" }}
                aria-hidden={idx >= clientLogos.length ? true : undefined}
              >
                <span
                  className="flex w-full items-center justify-center p-4 bg-white rounded-2xl hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] shadow-[0_2px_15px_rgb(0,0,0,0.03)] transition-all duration-500 border border-gray-50"
                  style={{ height: "clamp(8rem, 12vw, 11rem)" }}
                >
                  <Image
                    src={logo.src}
                    alt={idx < clientLogos.length && logo.name ? `لوگوی ${logo.name}` : ""}
                    width={176}
                    height={176}
                    sizes="176px"
                    loading="lazy"
                    className="max-h-full max-w-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.04)] transition-all duration-500"
                  />
                </span>
                <span
                  className="client-logo-name block min-h-[2.6em] w-full px-1 text-center text-[11px] leading-[1.3rem] text-gray-500"
                  dir="auto"
                >
                  {logo.name ?? ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
    </ViewportMotion>
  );
}
