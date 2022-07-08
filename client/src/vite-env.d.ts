/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
  readonly VITE_AUTH0_AUDIENCE: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_SCOPE: string;
  readonly VITE_API_BASE_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}