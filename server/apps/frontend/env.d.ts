/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BACKEND_URL: string
  readonly VITE_APP_ACCESS_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}