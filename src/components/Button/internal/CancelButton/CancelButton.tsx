import React, { FunctionComponent } from "react";
import styles from "./CancelButton.module.scss";
import Icon from "@/components/Icons";

type Props = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
}

const CancelButton: FunctionComponent<Props> = ({
                                                   onClick,
                                                   ...props
                                               }) => (
    (
        <a
            className={styles.button}
            onClick={onClick}
            {...props}
        >
            <Icon name={"cancel"} />
        </a>
    )
)

export default CancelButton;