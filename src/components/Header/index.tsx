'use client'

import {FunctionComponent, useEffect, useRef, useState} from "react";
import ThemeSelector from "@/components/ThemeSelector";
import styles from "./Header.module.scss"
import NavItem from "@/components/Header/internal/NavItem";
import Icon from "@/components/Icons";


const Header: FunctionComponent = () => {
    const [isOpened, setIsOpen] = useState(false)
    const [dragStartY, setDragStartY] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpened);
        setDragOffset(0);
    };

    const handleDragStart = (clientY: number) => {
        setIsDragging(true);
        setDragStartY(clientY);
    };

    const handleDragMove = (clientY: number) => {
        if (!isDragging) return;

        const offset = clientY - dragStartY;
        if (offset > 0) {
            setDragOffset(offset);
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);

        if (dragOffset > 100) {
            setIsOpen(false);
        }

        setDragOffset(0);
    };

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

        const handleMouseMove = (e: MouseEvent) => {
            handleDragMove(e.clientY);
        };

        const handleMouseUp = () => {
            handleDragEnd();
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStartY]);

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
        <div className={styles.header}>
            <div className={styles.desktop}>
                <div className={styles.items}>
                    <NavItem id={"main"} mobile={false}>
                        Alterix
                    </NavItem>
                    <NavItem id={"services"} mobile={false}>
                        Услуги
                    </NavItem>
                    <NavItem id={"stages"} mobile={false}>
                        Этапы
                    </NavItem>
                    <NavItem id={"projects"} mobile={false}>
                        Проекты
                    </NavItem>
                    <NavItem id={"order"} mobile={false}>
                        Заказать
                    </NavItem>
                    <NavItem id={"contacts"} mobile={false}>
                        Контакты
                    </NavItem>
                </div>
                <ThemeSelector onlyDarkTheme={false} />
            </div>
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

                {/* Backdrop/Overlay */}
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
                        <NavItem id={"main"} mobile={true} onClick={toggleMenu}>
                            Alterix
                        </NavItem>
                        <NavItem id={"services"} mobile={true} onClick={toggleMenu}>
                            Услуги
                        </NavItem>
                        <NavItem id={"stages"} mobile={true} onClick={toggleMenu}>
                            Этапы
                        </NavItem>
                        <NavItem id={"projects"} mobile={true} onClick={toggleMenu}>
                            Проекты
                        </NavItem>
                        <NavItem id={"order"} mobile={true} onClick={toggleMenu}>
                            Заказать
                        </NavItem>
                        <NavItem id={"contacts"} mobile={true} onClick={toggleMenu}>
                            Контакты
                        </NavItem>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;