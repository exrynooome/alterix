'use client'

import useTheme from "@/components/ThemeSelector/internal";
import styles from './ThemeSelector.module.scss'
import {FunctionComponent, useEffect, useRef, useState, useSyncExternalStore} from "react";
import Icon from "@/components/Icons";

function subscribe() {
    return () => {}
}

const ThemeSelector: FunctionComponent = () => {
    const { theme, setTheme } = useTheme()
    const containerRef = useRef<HTMLDivElement>(null)
    const buttonsRef = useRef<(HTMLButtonElement | null)[]>([])
    const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })

    const isClient = useSyncExternalStore(
        subscribe,
        () => true,
        () => false
    )

    const themes = [
        {value: "system" as const, label: "Системная"},
        {value: "dark" as const, label: "Темная"},
        {value: "light" as const, label: "Светлая"},
    ]

    const activeIndex = themes.findIndex((t) => t.value === theme)

    useEffect(() => {
        if (!isClient) return

        const activeButton = buttonsRef.current[activeIndex]
        if (!activeButton) return

        const updatePosition = () => {
            setIndicatorStyle({
                width: activeButton.offsetWidth,
                left: activeButton.offsetLeft,
            })
        }

        // Первоначальное позиционирование
        updatePosition()

        // Наблюдаем за изменениями размера
        const observer = new ResizeObserver(() => {
            updatePosition()
        })

        observer.observe(activeButton)

        return () => {
            observer.disconnect()
        }
    }, [isClient, activeIndex])

    // Обработка resize окна
    useEffect(() => {
        if (!isClient) return

        const handleResize = () => {
            const activeButton = buttonsRef.current[activeIndex]
            if (activeButton) {
                setIndicatorStyle({
                    width: activeButton.offsetWidth,
                    left: activeButton.offsetLeft,
                })
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isClient, activeIndex])

    if (!isClient) {
        return <div className="compact-skeleton"></div>
    }

    return (
        <div className={styles.selector} ref={containerRef}>
            <div
                className={styles.slider}
                style={{
                    width: `${indicatorStyle.width}px`,
                    transform: `translateX(${indicatorStyle.left}px)`,
                }}
            />
            {themes.map((t, index) => (
                <button
                    key={t.value}
                    ref={(el) => {
                        buttonsRef.current[index] = el
                    }}
                    onClick={() => setTheme(t.value)}
                    className={`${styles.tab} ${theme === t.value ? styles.active : ''}`}
                    aria-label={t.label}
                >
                    <Icon name={t.value} />
                </button>
            ))}
        </div>
    )
}

export default ThemeSelector;