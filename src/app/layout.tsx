import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "../styles/globals.scss";
import {ThemeProvider} from "@/components/ThemeSelector/internal";
import Header from "@/components/Header";

const manrope = Manrope({
    variable: "--font-manrope",
});

const involve = localFont({
    src: [
        {
            path: '../styles/involve/Involve-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../styles/involve/Involve-SemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../styles/involve/Involve-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../styles/involve/Involve-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: "--font-involve",
})

export const metadata: Metadata = {
    title: "Alterix",
    description: "Создаём цифровую версию вашего бизнеса — от идеи до результата",
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || (theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body className={`${manrope.variable} ${involve.variable}`}>
                <ThemeProvider>
                    <Header />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}