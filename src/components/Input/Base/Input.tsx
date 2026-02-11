'use client'

import React, {useState} from "react";
import styles from "./Input.module.scss";
import Icon, { IconName } from "@/components/Icons";

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    validate?: (value: string) => string | undefined;
    leftIcon?: IconName;
    rightIcon?: IconName;
    required?: boolean;
}

const Input: React.FC<Props> = ({
                                    value,
                                    onChange,
                                    error,
                                    validate,
                                    leftIcon,
                                    rightIcon,
                                    className = '',
                                    onBlur,
                                    required,
                                    ...restProps

                                }) => {

    const [internalError, setInternalError] = useState<string>('');
    const [touched, setTouched] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange?.(newValue);

        if (touched && internalError) {
            setInternalError('');
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setTouched(true);

        if (required && !value.trim()) {
            setInternalError('Заполните поле');
        }

        else if (validate) {
            const validationError = validate(value);
            setInternalError(validationError || '');
        }

        onBlur?.(e);
    };

    const displayError = error || (touched ? internalError : '');

    return (
        <div className={`${styles.input}`}>
            <div className={`${styles.baseInput} ${styles[className]}`}>
                <div className={`${styles.inputContainer} ${displayError ? styles.error : ''}`}>
                    {leftIcon &&
                        (<span className={`${styles.inputIcon} ${styles.left}`}>
                            <Icon name={leftIcon} />
                        </span>
                    )}
                    <input
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={required}
                        className={`${styles.inputField} ${leftIcon ? styles.left : ''} ${displayError ? styles.error : ''}`}
                        {...restProps}
                    />
                    {rightIcon &&
                        (<span className={`${styles.inputIcon} ${styles.right}`}>
                            <Icon name={rightIcon} />
                        </span>
                    )}
                </div>
                <div className={styles.inputFooter}>
                    {displayError && (
                        <p className={`text_14 ${styles.errorMessage}`}>{displayError}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Input;