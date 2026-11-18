/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH?: string;
  readonly VITE_ASSISTANT_ENDPOINT?: string;
  readonly VITE_BOOKING_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
