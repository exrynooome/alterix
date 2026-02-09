'use client'

import React, { useRef, useState } from "react";
import styles from "./FileInput.module.scss";
import Icon from "@/components/Icons";
import { CancelButton } from "@/components/Button";

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    onChange: (file: File | null) => void;
    error?: string;
    required?: boolean;
}

const FileInput: React.FC<Props> = ({
                                    onChange,
                                    error,
                                    className = '',
                                    onBlur,
                                    required = false,
                                    ...restProps

                                }) => {
    const [internalError, setInternalError] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
        onChange?.(null)
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null

        setSelectedFile(file)
        onChange?.(file)
    }

    const displayError = error || internalError;

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {

        if (required) {
            if (e.target.files?.[0] === null) {
                setInternalError("Выберите файл")
            }
        }

        onBlur?.(e);
    };

    return (
        <div className={`${styles.input}`}>
                <div className={`${styles.fileInput} ${styles[className]}`}>
                    <div className={`${styles.fileInputContainer} ${displayError ? styles.error : ''}`}>
                        <input
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            onBlur={handleBlur}
                            type="file"
                            className={styles.fileField}
                            {...restProps}
                        />
                        {!selectedFile && (
                            <div className={styles.fileLabel} onClick={handleClick}>
                                <Icon name={"attachment"} />
                                <p className={`text_16 ${styles.fileInputLabel}`}>Прикрепить файл</p>
                            </div>
                        )}
                        {selectedFile && (
                            <div className={styles.fileLabelNamed} onClick={handleClick}>
                                <div className={styles.text}>
                                    <Icon name={"attachment"} className={styles.fileInputIcon} />
                                    <p className={`text_16 ${styles.fileInputLabel}`}>{selectedFile.name}</p>
                                </div>
                                <CancelButton onClick={handleRemoveFile} />
                            </div>
                        )}
                    </div>
                </div>
        </div>
    )
}

export default FileInput;