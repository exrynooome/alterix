'use client'

import React, { useRef, useState } from "react";
import styles from "./Input.module.scss";
import Icon, { IconName } from "@/components/Icons";
import { CancelButton } from "@/components/Button";

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    leftIcon?: IconName;
    rightIcon?: IconName;
    validate?: (value: string) => string | undefined;
    formatter?: (value: string) => string;
    required?: boolean;
    type: string;
}

const Input: React.FC<Props> = ({
                                    value,
                                    onChange,
                                    error,
                                    leftIcon,
                                    rightIcon,
                                    validate,
                                    formatter,
                                    className = '',
                                    onBlur,
                                    required = false,
                                    type = 'text',
                                    ...restProps

                                }) => {
    const [internalError, setInternalError] = useState<string>('');
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isFile = type === "file";

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFileName('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setFile(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        if (file) {
            setFileName(file.name);
        }
    };

    const displayError = error || internalError;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;

        if (formatter) {
            newValue = formatter(newValue);
        }

        onChange(newValue);

        if (internalError) {
            setInternalError('');
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {

        if (validate) {
            const validateError = validate(value);
            if (validateError) {
                setInternalError(validateError);
            }
        }

        if (required) {
            if (value.length === 0 ){
               setInternalError('Заполните поле');
            }
        }

        onBlur?.(e);
    };

    return (
        <div className={`${styles.input}`}>
            {!isFile && (
                <div className={`${styles.baseInput} ${styles[className]}`}>
                    <div className={`${styles.inputContainer} ${displayError ? styles.error : ''}`}>
                        {leftIcon && <span className={`${styles.inputIcon} ${styles.left}`}>{leftIcon}</span>}
                        <input
                            ref={inputRef}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${styles.inputField} ${leftIcon ? styles.left : ''} ${displayError ? styles.error : ''}`}
                            {...restProps}
                        />
                        {rightIcon && <span className={`${styles.inputIcon} ${styles.right}`}>{rightIcon}</span>}
                    </div>
                    <div className={styles.inputFooter}>
                        {displayError && (
                            <p className={`text_14 ${styles.errorMessage}`}>{displayError}</p>
                        )}
                    </div>
                </div>
            )}

            {isFile && (
                <div className={`${styles.fileInput} ${styles[className]}`}>
                    <div className={`${styles.fileInputContainer} ${displayError ? styles.error : ''}`}>
                        <input
                            ref={fileInputRef}
                            value={value}
                            onChange={handleFileChange}
                            onBlur={handleBlur}
                            type="file"
                            className={styles.fileField}
                            {...restProps}
                        />
                        {!fileName && (
                            <div className={styles.fileLabel} onClick={handleButtonClick}>
                                <Icon name={"attachment"} />
                                <p className={`text_16 ${styles.fileInputLabel}`}>Прикрепить файл</p>
                            </div>
                        )}
                        {fileName && (
                            <div className={styles.fileLabel}>
                                <div className={styles.text}>
                                    <Icon name={"attachment"} className={styles.fileInputIcon} />
                                    <p className={`text_16 ${styles.fileInputLabel}`}>{fileName}</p>
                                </div>
                                <CancelButton onClick={handleRemoveFile} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Input;