'use client'

import { ReactNode } from "react";
import useTheme from "@/components/ThemeSelector/internal";

export default function ThemeVisibility({ children }: { children: ReactNode }) {
    const { resolvedTheme } = useTheme();

    if (resolvedTheme === 'light') {
        return null;
    }

    return <>{children}</>;
}