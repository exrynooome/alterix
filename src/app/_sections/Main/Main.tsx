import React, { FunctionComponent } from "react";
import styles from "./Main.module.scss";

const Main: FunctionComponent = () => {
    return (
        <section id="main" className={styles.main}>
            <h1>Alterix</h1>
            <h5>Создаём цифровую версию вашего бизнеса — от идеи до результата</h5>
        </section>
    );
};

export default Main;