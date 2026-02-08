'use client'

import React, { FunctionComponent } from "react";
import styles from './BorderSection.module.scss'

type Props = {
    id: string;
    color: 'blue' | 'purple';
    children: React.ReactNode;
}

const BorderSection: FunctionComponent<Props> = ({
                                                    id,
                                                    children,
                                                    color,
                                                 }) => {



    return (
        <section id={id} className={`${styles.container} ${styles[color]}`}>
            <div className={styles.borderedBlock}>
                {children}
            </div>
        </section>
    )
}

export default BorderSection;