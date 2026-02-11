'use client';

import Link from 'next/link';
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";
import styles from "./NavItem.module.scss";
import { useActiveSection } from "./useActiveSection";

interface Props {
    id?: string;
    href?: string;
    children?: React.ReactNode;
    mobile: boolean;
    onClick?: () => void;
}

const NavItem: FunctionComponent<Props> = ({
                                               children,
                                               id = '',
                                               mobile,
                                               onClick,
                                               href = '/'
                                           }) => {
    const activeId = useActiveSection();
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const targetElement = document.getElementById(id);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            router.push(`${href}#${id}`, { scroll: false });
        }

        if (onClick) {
            onClick();
        }
    };

    return (
        <div className={styles.container}>
            <Link
                href={`${href}#${id}`}
                className={`${activeId === id ? styles.active : ''} ${styles.item} ${mobile ? styles.mobile : styles.desktop}`}
                onClick={handleClick}
            >
                {children}
            </Link>
        </div>
    );
};

export default NavItem;