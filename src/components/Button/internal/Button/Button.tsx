import React, { FunctionComponent } from "react";
import styles from "./Button.module.scss";
import Icon, { IconName } from "@/components/Icons";

type Props = {
    variant?: "blue" | "border";
    leftIcon?: IconName | null;
    rightIcon?: IconName | null;
    href?: string;
    onClick?: React.MouseEventHandler;
    children?: React.ReactNode;
    className?: string;
}

const Button: FunctionComponent<Props> = ({
                                              onClick,
                                              href,
                                              children,
                                              leftIcon = null,
                                              rightIcon = null,
                                              variant = "blue",
                                              ...props
                                          }) => {
    const className = `${styles.button} ${variant === "blue" ? styles.blue : styles.border}`;

    const content = (
        <>
            {leftIcon && <Icon name={leftIcon} />}
            <p className={`text_16 ${styles.text}`}>{children}</p>
            {rightIcon && <Icon name={rightIcon} />}
        </>
    );

    return (
        <div className={styles.container}>
            {href ? (
                <a
                    className={className}
                    onClick={onClick}
                    href={href}
                    {...props}
                >
                    {content}
                </a>
            ) : (
                <button
                    className={className}
                    onClick={onClick}
                    type="button"
                    {...props}
                >
                    {content}
                </button>
            )}
        </div>
    );
};

export default Button;