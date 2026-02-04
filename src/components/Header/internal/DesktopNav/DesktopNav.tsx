import { FunctionComponent } from "react";
import ThemeSelector from "@/components/ThemeSelector";
import styles from "./DesktopNav.module.scss"
import NavItem from "@/components/Header/internal/NavItem/NavItem";
import {NavItems} from "@/types/types";

interface Props {
    items: NavItems[];
}

const DesktopNav: FunctionComponent<Props> = ({ items }) => {

    return (
            <div className={styles.desktop}>
                <div className={styles.items}>
                    {items.map((item) => (
                        <NavItem key={item.id} mobile={false} href={item.href} id={item.id}>
                            {item.label}
                        </NavItem>
                    ))}
                </div>
                <ThemeSelector onlyDarkTheme={false} />
            </div>
    )
}

export default DesktopNav;