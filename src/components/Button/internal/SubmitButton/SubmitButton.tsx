'use client'

import React, { FunctionComponent } from "react";
import styles from "./SubmitButton.module.scss";

const SubmitButton: FunctionComponent<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({
                                                    children,
                                                    ...props
                                                }) => (
    <div className={styles.container}>
        <button
            className={`${styles.button} ${styles.blue}`}
            {...props}
        >
            <p className={`text_16 ${styles.text}`}>{children}</p>
        </button>
    </div>
)

export default SubmitButton;