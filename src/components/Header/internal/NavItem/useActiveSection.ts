'use client'

import { useEffect, useSyncExternalStore } from 'react';

let activeId = '';
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
    listeners.add(callback);
    return () => listeners.delete(callback);
}

function getSnapshot() {
    return activeId;
}

function getServerSnapshot() {
    return '';
}

let observerInitialized = false;

function initObserver() {
    if (observerInitialized || typeof window === 'undefined') return;
    observerInitialized = true;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeId = entry.target.id;
                    listeners.forEach((cb) => cb());
                }
            });
        },
        { rootMargin: '-50% 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    const mutationObserver = new MutationObserver(() => {
        observer.disconnect();
        const updatedSections = document.querySelectorAll('section[id]');
        updatedSections.forEach((section) => observer.observe(section));
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
}

export function useActiveSection(): string {
    useEffect(() => {
        initObserver();
    }, []);

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}