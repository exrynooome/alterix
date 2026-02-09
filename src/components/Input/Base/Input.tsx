'use client'

import React from "react";
import styles from "./Input.module.scss";
import { IconName } from "@/components/Icons";

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    leftIcon?: IconName;
    rightIcon?: IconName;
}

const Input: React.FC<Props> = ({
                                    value,
                                    onChange,
                                    error,
                                    leftIcon,
                                    rightIcon,
                                    className = '',
                                    onBlur,
                                    ...restProps

                                }) => {

    return (
        <div className={`${styles.input}`}>
            <div className={`${styles.baseInput} ${styles[className]}`}>
                <div className={`${styles.inputContainer} ${error ? styles.error : ''}`}>
                    {leftIcon && (<span className={`${styles.inputIcon} ${styles.left}`}>{leftIcon}</span>)}
                    <input
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        onBlur={onBlur}
                        className={`${styles.inputField} ${leftIcon ? styles.left : ''} ${error ? styles.error : ''}`}
                        {...restProps}
                    />
                    {rightIcon && (<span className={`${styles.inputIcon} ${styles.right}`}>{rightIcon}</span>)}
                </div>
                <div className={styles.inputFooter}>
                    {error && (
                        <p className={`text_14 ${styles.errorMessage}`}>{error}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Input;