'use client'

import React, { FunctionComponent, useState } from "react";
import styles from "./Order.module.scss";
import Input from "@/components/Input";
import FileInput from "@/components/Input/File";
import Checkbox from "@/components/Checkbox";
import Link from "@/components/Link";
import Button from "@/components/Button";

const Order: FunctionComponent = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [file, setFile] = useState<File | null>(null)
    const [checked, setChecked] = useState<boolean>(false)

    return (
        <section id="order" className={styles.order}>
            <div className={styles.text}>
                <h4>Оставьте заявку или напишите нам в Телеграм</h4>
                <Button href={'/'} variant={'border'} leftIcon={"tg"}>Телеграм</Button>
            </div>
            <form className={styles.form}>
                <div className={styles.inputs}>
                    <Input value={name} onChange={setName} type={"text"} required={true} placeholder="Имя *" />
                    <Input value={phone} onChange={setPhone} type={"phone"} required={true} placeholder="Телефон *" />
                    <Input value={email} onChange={setEmail} type={"email"} required={false} placeholder="Электронная почта" />
                    <Input value={comment} onChange={setComment} type={"text"} required={false} placeholder="Комментарий" />
                    <FileInput onChange={setFile} type="file" required={false} />
                </div>
                <Checkbox checked={checked} onChange={setChecked} required={true}>
                    <p>Я согласен с правилами обработки <span>
                        <Link size={"medium"} variant={"mainColor"} href={"/"} className={styles.checkbox}>
                            персональных данных
                        </Link>
                    </span> *</p>
                </Checkbox>
                <Button variant={"blue"} >
                    Отправить
                </Button>
            </form>
        </section>
    );
};

export default Order;