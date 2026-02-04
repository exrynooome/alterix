'use client'

import { FunctionComponent } from "react";
import styles from "./Header.module.scss"
import {NavItems} from "@/types/types";
import DesktopNav from "./internal/DesktopNav";
import MobileNav from "./internal/MobileNav";


const Header: FunctionComponent = () => {

    const NavItems: NavItems[] = [
        { id: "main", label: "Alterix"},
        { id: "services", label: "Услуги"},
        { id: "stages", label: "Этапы"},
        { id: "projects", label: "Проекты"},
        { id: "order", label: "Заказать"},
        { id: "contacts", label: "Контакты"},
    ]

    return (
        <div className={styles.header}>
            <DesktopNav items={NavItems} />
            <MobileNav items={NavItems} />
        </div>
    )
}

export default Header;