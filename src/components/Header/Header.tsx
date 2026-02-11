import { FunctionComponent } from "react";
import styles from "./Header.module.scss"
import { NavItems } from "@/types/types";
import DesktopNav from "./internal/DesktopNav";
import MobileNav from "./internal/MobileNav";


const navItems: NavItems[] = [
    { id: "main", label: "Alterix"},
    { id: "services", label: "Услуги"},
    { id: "stages", label: "Этапы"},
    { id: "projects", label: "Проекты"},
    { id: "order", label: "Заказать"},
    { id: "contacts", label: "Контакты"},
]

const Header: FunctionComponent = () => {

    return (
        <div className={styles.header}>
            <DesktopNav items={navItems} />
            <MobileNav items={navItems} />
        </div>
    )
}

export default Header;