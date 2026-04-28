import { motion } from 'framer-motion'
import { SKILL_CATEGORIES } from '@/assets/content'
import { SITE_IMAGES } from '@/assets/siteImages'
import { SectionBackdrop } from '@/components/SectionBackdrop'
import { SectionHeading } from '@/components/SectionHeading'
import { TechIcon } from '@/components/TechIcon'
import { staggerContainer, staggerItem } from '@/lib/motion'

export function Skills() {
  return (
    <section
      id="skills"
      className="group/section relative scroll-mt-20 overflow-hidden px-6 py-28 md:px-10 md:py-36 lg:py-44"
    >
      <SectionBackdrop
        desktop={SITE_IMAGES.skills.desktop}
        mobile={SITE_IMAGES.skills.mobile}
        imageOpacity={0.12}
      />
      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="Skills"
          title="Stack & craft"
          subtitle="Tools and platforms I use daily — familiar logos, same disciplined delivery."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-4 grid gap-6 sm:gap-8 lg:grid-cols-3"
        >
          {SKILL_CATEGORIES.map((category) => (
            <motion.div
              key={category.title}
              variants={staggerItem}
              className="group/card rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-soft backdrop-blur-xl transition duration-500 hover:-translate-y-0.5 hover:border-white/[0.1] hover:from-white/[0.08] hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)] sm:p-8"
            >
              <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-accent/85">
                {category.title}
              </h3>

              <ul className="mt-6 flex flex-col gap-2">
                {category.skills.map((skill) => (
                  <li key={`${category.title}-${skill.label}`}>
                    <div className="group/row flex items-center gap-3 rounded-2xl border border-transparent px-3 py-2.5 transition duration-300 hover:border-white/[0.06] hover:bg-white/[0.03]">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 group-hover/row:border-accent/20 group-hover/row:bg-accent/[0.06] group-hover/row:text-accent/90">
                        <TechIcon name={skill.icon} className="h-[1.125rem] w-[1.125rem]" />
                      </div>
                      <span className="text-[13px] font-medium leading-snug text-gray-300 transition group-hover/row:text-white">
                        {skill.label}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
