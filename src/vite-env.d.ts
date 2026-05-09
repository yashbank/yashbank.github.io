/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Full Formspree endpoint, e.g. https://formspree.io/f/xxxxxxxx */
  readonly VITE_CONTACT_FORM_ACTION?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
