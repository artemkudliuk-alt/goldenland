import Image from "next/image";
import { SectionEyebrow } from "@/components/SectionEyebrow";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  bgImage?: string;
};

export function PageHero({ eyebrow, title, subtitle, bgImage }: Props) {
  return (
    <section className="relative bg-[#0a0a0a] text-white pt-[calc(90px+4rem)] pb-20 md:pt-[calc(90px+6rem)] md:pb-28 overflow-hidden min-h-[420px] flex items-center">
      {bgImage && (
        <>
          <Image
            src={bgImage}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Градиентное затемнение слева для идеальной читаемости текста */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 pointer-events-none" />
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        </>
      )}

      {/* Soft gold ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(212,175,55,0.08)_0%,transparent_55%)]" />

      <div className="bower-container relative z-10 w-full">
        <div className="max-w-[860px]">
          {eyebrow && (
            <SectionEyebrow className="mb-5 text-[#D4AF37]">{eyebrow}</SectionEyebrow>
          )}
          <h1 className="text-[38px] font-light leading-[1.08] tracking-[-0.015em] text-white md:text-[56px] lg:text-[64px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-[680px] text-[16px] font-light leading-[1.75] text-white md:text-[18px]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
