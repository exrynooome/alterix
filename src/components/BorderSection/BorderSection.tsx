'use client'

import { FunctionComponent } from "react";
import styles from './BorderSection.module.scss'
import BgColor from "@/components/BgColor";

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    id: string;
    color: 'blue' | 'purple';
}

const BorderSection: FunctionComponent<Props> = ({
                                                    id,
                                                    children,
                                                    color,
                                                 }) => {



    return (
        <section id={id} className={styles.container}>
            <div className={styles.borderedBlock}>
                {children}
            </div>
            <BgColor color={color} />
        </section>
    )
}

export default BorderSection;