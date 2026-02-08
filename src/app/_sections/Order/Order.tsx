'use client'

import React, { FunctionComponent } from "react";
import styles from "./Order.module.scss";
// import Input from "@/components/Input";

const Order: FunctionComponent = () => {

    // const [name, setName] = useState('');
    // const [phone, setPhone] = useState('');
    // const [email, setEmail] = useState('');
    // const [file, setFile] = useState('');

    return (
        <section id="order" className={styles.order}>
            {/*<Input value={name} onChange={setName} type={"text"} required={true} placeholder="Имя *" />*/}
            {/*<Input value={phone} onChange={setPhone} type={"phone"} required={true} placeholder="Телефон *" />*/}
            {/*<Input value={email} onChange={setEmail} type={"email"} required={false} placeholder="Электронная почта" />*/}
            {/*<Input value={file} onChange={setFile} type={"file"} required={false} />*/}
        </section>
    );
};

export default Order;