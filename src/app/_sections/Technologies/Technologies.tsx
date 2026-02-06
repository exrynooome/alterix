import React, { FunctionComponent } from "react";
import styles from "./Technologies.module.scss";
import BorderSection from "@/components/BorderSection";

const Technologies: FunctionComponent = () => {

    return (
        <BorderSection id={""} color={"purple"}>
            <div className={styles.text_block}>
                <div className={styles.text}>
                    <h4>Разрабатываем сайты</h4>
                    <p className={"text_20"}>Лендинги, интернет-магазины, корпоративные сайты, сайты для бизнеса, сервисы, телеграм-ботов, SaaS и плагины для CRM</p>
                </div>
            </div>
            <div className={styles.image}>

            </div>
        </BorderSection>
    );
};

export default Technologies;