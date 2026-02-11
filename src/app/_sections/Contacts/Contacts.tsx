import React, { FunctionComponent } from "react";
import styles from "./Contacts.module.scss";
import TextLink from "@/components/TextLink";

const Contacts: FunctionComponent = () => {

    return (
        <section id="contacts" className={styles.contacts}>
            <div className={styles.desktop}>
                <div className={`${styles.text} ${styles.block}`}>
                    <h3>Alterix</h3>
                    <div className={styles.small_text}>
                        <p className={"text_14"}>© 2026 Alterix</p>
                        <TextLink size={"small"} variant={"secondaryColor"} href={"/"}>Политика конфиденциальности</TextLink>
                    </div>
                </div>
                <div className={`${styles.links} ${styles.block}`}>
                    <TextLink size={"large"} variant={"mainColor"} href="/">+7 993 327-27-67</TextLink>
                    <TextLink size={"large"} variant={"mainColor"} href="/">hello@alterix.ru</TextLink>
                    <TextLink size={"large"} variant={"mainColor"} href="/">Telegram</TextLink>
                </div>
            </div>
            <div className={styles.mobile}>
                <h3>Alterix</h3>
                <div className={`${styles.links} ${styles.block}`}>
                    <TextLink size={"large"} variant={"mainColor"} href="/">+7 993 327-27-67</TextLink>
                    <TextLink size={"large"} variant={"mainColor"} href="/">hello@alterix.ru</TextLink>
                    <TextLink size={"large"} variant={"mainColor"} href="/">Telegram</TextLink>
                </div>
                <div className={styles.small_text}>
                    <TextLink size={"small"} variant={"secondaryColor"} href={"/"}>Политика конфиденциальности</TextLink>
                    <p className={"text_14"}>© 2026 Alterix</p>
                </div>
            </div>
        </section>
    );
};

export default Contacts;