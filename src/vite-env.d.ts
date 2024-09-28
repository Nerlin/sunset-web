/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_USE_MSW: string;
  readonly VITE_APP_AUTHOR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
