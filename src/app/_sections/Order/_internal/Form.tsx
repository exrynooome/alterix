'use client'

import React, { FormEvent, FunctionComponent, useState } from "react";
import styles from "./Form.module.scss";
import Input from "@/components/Input";
import FileInput from "@/components/Input/File";
import Checkbox from "@/components/Checkbox";
import Link from "@/components/Link";
import { SubmitButton } from "@/components/Button";
import { FormErrors, FormSubmitData } from "@/types/form";
import { validateEmail, validatePhone } from "@/utils/validate";

const Form: FunctionComponent = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [checked, setChecked] = useState<boolean>(false);

    const [errors, setErrors] = useState<FormErrors>({
        name: '',
        phone: '',
        email: '',
        checkbox: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrors({
            name: '',
            phone: '',
            email: '',
            checkbox: ''
        });

        if (!checked) {
            setErrors(prev => ({ ...prev, checkbox: 'Необходимо согласие на обработку данных' }));
            return;
        }

        setIsSubmitting(true);

        try {
            const formData: FormSubmitData = {
                name,
                phone,
                email,
                comment,
                timestamp: new Date().toISOString(),
            };

            if (file) {
                const base64File = await fileToBase64(file);
                formData.file = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: base64File
                };
            }

            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setName('');
                setPhone('');
                setEmail('');
                setComment('');
                setFile(null);
                setChecked(false);
            } else {
                if (result.fieldErrors) {
                    setErrors({
                        name: result.fieldErrors.name || '',
                        phone: result.fieldErrors.phone || '',
                        email: result.fieldErrors.email || '',
                        checkbox: result.fieldErrors.checkbox || ''
                    });
                }
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
            <form className={styles.form} onSubmit={handleSubmit} noValidate={true}>
                <div className={styles.inputs}>
                    <Input
                        value={name}
                        onChange={setName}
                        type={"text"}
                        required={true}
                        placeholder="Имя *"
                        error={errors.name}
                    />
                    <Input
                        value={phone}
                        onChange={setPhone}
                        validate={validatePhone}
                        type={"tel"}
                        required={true}
                        placeholder="Телефон *"
                        error={errors.phone}
                    />
                    <Input value={email}
                           onChange={setEmail}
                           validate={validateEmail}
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
                        <Link size={"medium"} variant={"mainColor"} href={"/"} className={`${styles.checkbox}`} error={errors.checkbox}>
                            персональных данных
                        </Link>
                    </span> *</p>
                </Checkbox>

                <SubmitButton type="submit">
                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                </SubmitButton>
            </form>
    );
};

export default Form;