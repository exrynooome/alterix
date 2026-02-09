import React, { FunctionComponent } from "react";
import styles from "./Order.module.scss";
import Button from "@/components/Button";
import Form from "@/app/_sections/Order/_internal";

const Order: FunctionComponent = () => {

    return (
        <section id="order" className={styles.order}>
            <div className={styles.text}>
                <h4>Оставьте заявку или напишите нам в Телеграм</h4>
                <Button href={'/'} variant={'border'} leftIcon={"tg"}>Телеграм</Button>
            </div>
            <Form />
        </section>
    );
};

export default Order;