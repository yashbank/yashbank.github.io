import { useState } from 'react'
import { motion } from 'framer-motion'
import { SITE } from '@/assets/content'
import { SITE_IMAGES } from '@/assets/siteImages'
import { SectionBackdrop } from '@/components/SectionBackdrop'
import { SectionHeading } from '@/components/SectionHeading'
import { fadeInUp } from '@/lib/motion'

type FormStatus = 'idle' | 'sending' | 'sent'

/** Contact: mailto + WhatsApp + form (wire EmailJS via env when ready). */
export function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)

    await new Promise((r) => setTimeout(r, 900))
    console.info('Contact form:', Object.fromEntries(data.entries()))
    setStatus('sent')
    form.reset()
    window.setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section
      id="contact"
      className="group/section relative scroll-mt-20 overflow-hidden px-6 py-28 md:px-10 md:py-36 lg:pb-40 lg:pt-36"
    >
      <SectionBackdrop
        desktop={SITE_IMAGES.contact.desktop}
        mobile={SITE_IMAGES.contact.mobile}
        imageOpacity={0.1}
      />
      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something sharp"
          subtitle="Tell me about your timeline, stack, and what success looks like."
        />

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.animate}
            viewport={{ once: true }}
            transition={fadeInUp.transition}
            className="flex flex-col gap-4"
          >
            <a
              href={`mailto:${SITE.email}`}
              className="glass flex items-center justify-between rounded-2xl px-6 py-5 transition duration-500 hover:scale-[1.01] hover:border-accent/35 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.4)]"
            >
              <span>
                <span className="block text-xs uppercase tracking-widest text-gray-500">Email</span>
                <span className="mt-1 block text-lg text-white">{SITE.email}</span>
              </span>
              <span className="text-accent" aria-hidden>
                →
              </span>
            </a>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="glass flex items-center justify-between rounded-2xl px-6 py-5 transition duration-500 hover:scale-[1.01] hover:border-accent/35 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.4)]"
            >
              <span>
                <span className="block text-xs uppercase tracking-widest text-gray-500">Phone</span>
                <span className="mt-1 block text-lg text-white">{SITE.phone}</span>
              </span>
              <span className="text-accent" aria-hidden>
                →
              </span>
            </a>
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center justify-between rounded-2xl px-6 py-5 transition duration-500 hover:scale-[1.01] hover:border-[#25D366]/40 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.4)]"
            >
              <span>
                <span className="block text-xs uppercase tracking-widest text-gray-500">
                  WhatsApp
                </span>
                <span className="mt-1 block text-lg text-white">{SITE.whatsapp}</span>
              </span>
              <span className="text-[#25D366]" aria-hidden>
                →
              </span>
            </a>
            <p className="text-sm text-gray-500">
              Based in {SITE.location}. Open to remote work across India, GCC, the US, and compatible time zones.
            </p>
          </motion.div>

          <motion.form
            initial={fadeInUp.initial}
            whileInView={fadeInUp.animate}
            viewport={{ once: true }}
            transition={{ ...fadeInUp.transition, delay: 0.05 }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-xs font-medium uppercase tracking-widest text-gray-500">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-600 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-xs font-medium uppercase tracking-widest text-gray-500">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-600 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-xs font-medium uppercase tracking-widest text-gray-500">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-600 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
                  placeholder="Project scope, budget range, and ideal start date…"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary mt-8 w-full py-4 text-sm disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message queued ✓' : 'Send message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
