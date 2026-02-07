'use client'

import {FunctionComponent} from "react";
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
            <div className={`${styles.container} ${styles[color]}`}>
                <svg
                    className={`${styles.wave} ${styles.wave1} ${styles[color]}`}
                    width="2410"
                    height="837"
                    viewBox="0 0 2410 837"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M612.192 209.425C427.587 60.4034 127.146 86.8717 0 118.733L177.092 803.138H1214.07L2147.47 837L2409.55 352.444C2415.18 344.555 2370.64 285.219 2147.47 110.978C1868.48 -106.823 1450 33.5969 1318.82 210.277C1187.66 386.957 842.949 395.7 612.192 209.425Z" fill="currentColor"/>
                </svg>

            </div>
        </div>
    )
}

export default BgColor;