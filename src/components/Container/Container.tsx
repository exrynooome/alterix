import React, { FunctionComponent } from "react";
import styles from "./Container.module.scss";

interface Props {
    children?: React.ReactNode;
}

const Container: FunctionComponent<Props> = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default Container;