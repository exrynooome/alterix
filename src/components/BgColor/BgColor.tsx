import { FunctionComponent } from "react";
import styles from './BgColor.module.scss'
import ThemeVisibility from "@/components/BgColor/internal";

interface Props {
    color: 'blue' | 'purple' | 'darkBlue';
    position?: 'above' | 'below';
    size?: 'small' | 'normal';
}

const BgColor: FunctionComponent<Props> = ({ color, position = 'below', size = 'normal' }) => {
    return (
        <ThemeVisibility>
            <div className={`${styles.wrapper} ${styles[position]}`}>
                <div className={`${styles.blurContainer} ${styles[color]} ${styles[size]}`}>
                    <div className={styles.rectangle} />
                    <div className={`${styles.circle} ${styles.circle__1} ${styles[size]}`} />
                    <div className={`${styles.circle} ${styles.circle__2} ${styles[size]}`} />
                </div>
            </div>
        </ThemeVisibility>
    )
}

export default BgColor;