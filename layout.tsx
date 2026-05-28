import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "NEW DAWN Tattoo Motive Generator", description: "Tattoo motives, prompts and WhatsApp requests by NEW DAWN TATTOOZ." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="de"><body>{children}</body></html>; }
