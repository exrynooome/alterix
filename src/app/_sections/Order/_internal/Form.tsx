'use client'

import React, { FunctionComponent, useState } from "react";
import styles from "./Form.module.scss";
import Input from "@/components/Input";
import FileInput from "@/components/Input/File";
import Checkbox from "@/components/Checkbox";
import Link from "@/components/Link";
import Button from "@/components/Button";

const Form: FunctionComponent = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [checked, setChecked] = useState<boolean>(false);

    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        email: '',
        checkbox: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateEmail = (email: string): boolean => {
        if (!email) return true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    };

    const validateForm = (): boolean => {
        const newErrors = {
            name: '',
            phone: '',
            email: '',
            checkbox: ''
        };

        let isValid = true;

        if (!name.trim()) {
            newErrors.name = 'Введите имя';
            isValid = false;
        }

        if (!phone.trim()) {
            newErrors.phone = 'Введите телефон';
            isValid = false;
        } else if (!validatePhone(phone)) {
            newErrors.phone = 'Введите корректный телефон';
            isValid = false;
        }

        if (email && !validateEmail(email)) {
            newErrors.email = 'Введите корректный email';
            isValid = false;
        }

        if (!checked) {
            newErrors.checkbox = 'Необходимо согласие на обработку данных';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };



    return (
            <form className={styles.form}>
                <div className={styles.inputs}>
                    <Input
                        value={name}
                        onChange={(value) => {setName(value); if (errors.name) setErrors({ ...errors, name: value})}}
                        type={"text"}
                        required={true}
                        placeholder="Имя *"
                        error={errors.name}
                    />
                    <Input
                        value={phone}
                        onChange={(value) => {setPhone(value); if (errors.phone) setErrors({ ...errors, phone: ''})}}
                        type={"tel"}
                        required={true}
                        placeholder="Телефон *"
                        error={errors.phone}
                    />
                    <Input value={email}
                           onChange={(value) => {setEmail(value); if (errors.email) setErrors({ ...errors, email: ''})}}
                           type={"email"}
                           required={false}
                           placeholder="Электронная почта"
                           error={errors.email}
                    />
                    <Input
                        value={comment}
                        onChange={setComment}
                        type={"text"}
                        required={false}
                        placeholder="Комментарий"
                    />
                    <FileInput
                        onChange={setFile}
                        type="file"
                        required={false}
                    />
                </div>
                <Checkbox
                    checked={checked}
                    onChange={(value) => {setChecked(value); if (errors.checkbox) setErrors({ ...errors, checkbox: ''})}}
                    required={true}
                    error={errors.checkbox}
                >
                    <p>Я согласен с правилами обработки <span>
                        <Link size={"medium"} variant={"mainColor"} href={"/"} className={`${styles.checkbox} ${errors.checkbox ? styles.checkboxError : ''}`}>
                            персональных данных
                        </Link>
                    </span> *</p>
                </Checkbox>

                <Button variant={"blue"} type="submit">
                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                </Button>
            </form>
    );
};

export default Form;