'use client';

import Link from 'next/link';
import { useRouter } from "next/navigation";
import {FunctionComponent, useEffect, useState} from "react";
import styles from "./NavItem.module.scss";

interface Props {
    id?: string,
    href?: string,
    children?: React.ReactNode,
    mobile: boolean,
    onClick?: () => void
}

const NavItem: FunctionComponent<Props> = (({
                                                children,
                                                id = '',
                                                mobile,
                                                onClick,
                                                href = '/'
                                            }) => {
    const [activeId, setActiveId] = useState('')
    const router = useRouter()

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            {rootMargin: '-50% 0px -50% 0px'}
        )

        const sections = document.querySelectorAll('section[id]')
        sections.forEach((section) => observer.observe(section))

        return () => observer.disconnect()
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        const targetElement = document.getElementById(id)
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })

            router.push(`${href}#${id}`, { scroll: false })
        }

        if (onClick) {
            onClick()
        }
    }

    return (
        <div className={`${styles.container}`}>
            <Link href={`${href}#${id}`}
                  className={`${activeId === id ? styles.active : ''} ${styles.item} ${mobile ? styles.mobile : styles.desktop}`}
                  onClick={handleClick}
            >
                {children}
            </Link>
        </div>
    );
})

export default NavItem;
