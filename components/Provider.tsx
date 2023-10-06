"use client";

import { FileUploadProvider } from "@/context/file";

export function Providers({ children }: { children: React.ReactNode }) {
  return <FileUploadProvider>{children}</FileUploadProvider>;
}
