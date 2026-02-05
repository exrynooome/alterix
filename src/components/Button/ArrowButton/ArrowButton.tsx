import React, {FunctionComponent} from "react";
import styles from "./ArrowButton.module.scss";
import Icon from "@/components/Icons";

type Props = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    arrowDirection?: "left" | "right";
    disabled?: boolean;
}

const ArrowButton: FunctionComponent<Props> = ({
                                              className,
                                              onClick,
                                              href,
                                              arrowDirection,
                                              disabled = false,
                                              ...props
                                          }) => (
    (
        <div className={styles.container}>
            <a
                className={`${styles.button} ${disabled ? styles.disabled : ''} ${
                    className ? ` ${className}` : ""
                }`}
                onClick={disabled ? undefined : onClick}
                href={disabled ? undefined : href}
                {...props}
            >
                {arrowDirection === "left" ? (
                    <Icon name={"arrowLeft"} />
                ) : (
                    <Icon name={"arrowRight"} />
                )}
            </a>
        </div>
    )
)

export default ArrowButton;