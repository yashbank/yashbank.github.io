import { useState } from 'react'
import { motion } from 'framer-motion'
import { SITE } from '@/assets/content'
import { SectionBackdrop } from '@/components/SectionBackdrop'
import { SectionHeading } from '@/components/SectionHeading'
import { fadeInUp } from '@/lib/motion'

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

const formAction = import.meta.env.VITE_CONTACT_FORM_ACTION?.trim()

/**
 * Contact: Formspree-compatible POST via `VITE_CONTACT_FORM_ACTION` (see `.env.example`);
 * if unset, submit composes a mailto URL so inquiries still reach the inbox.
 */
export function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const submitMailto = (form: HTMLFormElement) => {
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const subject = encodeURIComponent(`Project inquiry — ${name || 'Portfolio contact'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}\n\n— Sent from ${SITE.portfolioUrl}`,
    )
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`
    setStatus('sent')
    form.reset()
    window.setTimeout(() => setStatus('idle'), 5000)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setErrorMessage('')
    setStatus('sending')

    if (!formAction) {
      submitMailto(form)
      return
    }

    const data = new FormData(form)
    try {
      const res = await fetch(formAction, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      const json = (await res.json().catch(() => null)) as { error?: string } | null
      if (!res.ok) {
        setErrorMessage(json?.error ?? 'Something went wrong. Please email directly.')
        setStatus('error')
        return
      }
      setStatus('sent')
      form.reset()
      window.setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setErrorMessage('Network error. Try email or WhatsApp below.')
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="group/section relative scroll-mt-20 overflow-hidden py-24 sm:py-28 md:py-36 lg:py-40"
    >
      <SectionBackdrop />
      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="Contact"
          title="Tell me what you are shipping next"
          subtitle="Share scope, timeline, and what “done” looks like. I reply within one to two business days with honest fit and next steps — or a referral if I am not the right match."
        />

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.animate}
            viewport={{ once: true }}
            transition={fadeInUp.transition}
            className="flex flex-col gap-4"
          >
            <p className="text-sm leading-relaxed text-gray-400">
              Prefer a direct line? Use email or WhatsApp — same response window. Phone is fine for India-based
              teams who want a quick voice note first.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="glass flex items-center justify-between rounded-2xl px-6 py-5 transition duration-200 hover:border-accent/25"
            >
              <span>
                <span className="block text-xs uppercase tracking-widest text-gray-400">Email</span>
                <span className="mt-1 block text-lg text-white">{SITE.email}</span>
              </span>
              <span className="text-accent" aria-hidden>
                →
              </span>
            </a>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="glass flex items-center justify-between rounded-2xl px-6 py-5 transition duration-200 hover:border-accent/25"
            >
              <span>
                <span className="block text-xs uppercase tracking-widest text-gray-400">Phone</span>
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
              className="glass flex items-center justify-between rounded-2xl px-6 py-5 transition duration-200 hover:border-[#25D366]/35"
            >
              <span>
                <span className="block text-xs uppercase tracking-widest text-gray-400">WhatsApp</span>
                <span className="mt-1 block text-lg text-white">{SITE.whatsapp}</span>
              </span>
              <span className="text-[#25D366]" aria-hidden>
                →
              </span>
            </a>
            <p className="text-sm text-gray-500">
              Based in {SITE.location}. Remote work across India, the GCC, the US, and compatible time zones.
            </p>
          </motion.div>

          <motion.form
            initial={fadeInUp.initial}
            whileInView={fadeInUp.animate}
            viewport={{ once: true }}
            transition={{ ...fadeInUp.transition, delay: 0.05 }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 md:p-8"
            aria-live="polite"
          >
            {!formAction ? (
              <p className="contact-endpoint-hint mb-5 rounded-xl border px-4 py-3 text-sm leading-relaxed">
                Form endpoint not configured — submissions open your mail client. Add{' '}
                <code className="contact-endpoint-hint-code rounded px-1.5 py-0.5 text-xs">VITE_CONTACT_FORM_ACTION</code>{' '}
                (e.g. Formspree URL) in <code className="contact-endpoint-hint-code rounded px-1.5 py-0.5 text-xs">.env</code>{' '}
                for in-page delivery.
              </p>
            ) : null}
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-xs font-medium uppercase tracking-widest text-gray-400">
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
                <label htmlFor="email" className="text-xs font-medium uppercase tracking-widest text-gray-400">
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
                <label htmlFor="message" className="text-xs font-medium uppercase tracking-widest text-gray-400">
                  Project details
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-600 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
                  placeholder="Goals, timeline, budget band, links to references or existing product…"
                />
              </div>
            </div>
            {status === 'error' && errorMessage ? (
              <p className="mt-4 text-sm text-red-300/95" role="alert">
                {errorMessage}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
              className="btn-primary focus-ring mt-8 w-full py-4 text-sm transition duration-200 ease-out disabled:opacity-60"
            >
              {status === 'sending'
                ? 'Sending…'
                : status === 'sent'
                  ? 'Received — thank you'
                  : 'Request a reply'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
