'use client'

import {FunctionComponent, useCallback, useEffect, useRef, useState} from "react";
import ThemeSelector from "@/components/ThemeSelector";
import styles from "./MobileNav.module.scss"
import NavItem from "@/components/Header/internal/NavItem";
import Icon from "@/components/Icons";
import { NavItems } from "@/types/types";

interface Props {
    items: NavItems[];
}

const MobileNav: FunctionComponent<Props> = ({ items }) => {
    const [isOpened, setIsOpen] = useState(false)
    const [isDragging, setIsDragging] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const dragStartYRef = useRef(0);
    const dragOffsetRef = useRef(0);
    const [dragOffset, setDragOffset] = useState(0);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
        dragOffsetRef.current = 0;
        setDragOffset(0);
    };

    const handleDragStart = useCallback((clientY: number) => {
        setIsDragging(true);
        dragStartYRef.current = clientY;
    }, []);

    const handleDragMove = useCallback((clientY: number) => {
        const offset = clientY - dragStartYRef.current;
        if (offset > 0) {
            dragOffsetRef.current = offset;
            setDragOffset(offset);
        }
    }, []);

    const handleDragEnd = useCallback(() => {
        setIsDragging(false);

        if (dragOffsetRef.current > 100) {
            setIsOpen(false);
        }

        dragOffsetRef.current = 0;
        setDragOffset(0);
    }, []);

    const handleTouchStart = (e: React.TouchEvent) => {
        handleDragStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        handleDragMove(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
        handleDragEnd();
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        handleDragStart(e.clientY);
    };

    useEffect(() => {
        if (!isDragging) return;

        const onMouseMove = (e: MouseEvent) => {
            handleDragMove(e.clientY);
        };

        const onMouseUp = () => {
            handleDragEnd();
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [isDragging, handleDragMove, handleDragEnd]);

    useEffect(() => {
        if (isOpened) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpened]);

    return (
        <div className={styles.mobile}>
            <div className={styles.mobileHeader}>
                <p className={"text_16 involve"}>Alterix</p>
                <button
                    className={styles.menuButton}
                    onClick={toggleMenu}
                >
                        <span className={`${styles.menuIcon} ${isOpened ? styles.open : ''}`}>
                            <Icon name={"menu"} />
                        </span>
                </button>
            </div>

            {isOpened && (
                <div
                    className={styles.backdrop}
                    onClick={toggleMenu}
                />
            )}

            <div className={`${styles.menu} ${isOpened ? styles.opened : ''}`} ref={menuRef} style={{transform: isOpened
                    ? `translateY(${dragOffset}px)`
                    : `translateY(100%)`,
                transition: isDragging ? `none` : `transform .2s ease-out`
            }}>
                <div
                    className={styles.dragHandle}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                >
                    <div className={styles.handleBar}></div>
                </div>
                <div className={styles.content}>
                    <ThemeSelector onlyDarkTheme={true} />
                </div>
                <div className={styles.mobileItems}>
                    {items.map((item) => (
                        <NavItem key={item.id} mobile={true} href={item.href} id={item.id} onClick={toggleMenu}>
                            {item.label}
                        </NavItem>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MobileNav;