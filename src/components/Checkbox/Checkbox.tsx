'use client'

import React from "react";
import styles from "./Checkbox.module.scss";
import Icon from "@/components/Icons";

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    error?: string;
    children?: React.ReactNode;
    required?: boolean;
}

const Checkbox: React.FC<Props> = ({
                                    checked,
                                    onChange,
                                    error,
                                    className = '',
                                    children,
                                    required = true,
                                    ...restProps
                                }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.checked)
    }

    return (
        <label className={`${styles.container} ${styles[className]}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => handleChange(e)}
                className={styles.input}
                required={required}
            />
            <div className={`${styles.checkbox} ${checked ? styles.checked : ''} ${error ? styles.error : ''}`}>
                {checked && (
                    <Icon className={styles.icon} name={"agree"} />
                )}
            </div>
            <div className={styles.label}>
                {children}
            </div>
        </label>
    )
}

export default Checkbox;