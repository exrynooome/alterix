'use client'

import { FunctionComponent } from "react";
import styles from './BgColor.module.scss'
import useTheme from "@/components/ThemeSelector/internal";

interface Props {
    color: 'blue' | 'purple';
    position?: 'above' | 'below';
}

const BgColor: FunctionComponent<Props> = ({ color, position = 'below' }) => {
    const { theme } = useTheme()

    if (theme === 'light') {
        return null;
    }

    return (
        <div className={`${styles.wrapper} ${styles[position]}`}>
            <div className={`${styles.blurContainer} ${styles[color]}`}>
                <div className={styles.rectangle} />
                <div className={`${styles.circle} ${styles.circle__1}`} />
                <div className={`${styles.circle} ${styles.circle__2}`} />
            </div>
        </div>
    )
}

export default BgColor;