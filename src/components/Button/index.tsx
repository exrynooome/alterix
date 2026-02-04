import React, {FunctionComponent} from "react";
import styles from "./Button.module.scss";
import Icon, {IconName} from "@/components/Icons";

type Props = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    variant?: "blue" | "border";
    leftIcon?: IconName | null;
    rightIcon?: IconName | null;
}

const Button: FunctionComponent<Props> = ({
                                     className,
                                     onClick,
                                     href,
                                     children,
                                     leftIcon = null,
                                     rightIcon = null,
                                     variant = "blue",
                                     ...props
                                 }) => (
    (
        <div className={styles.container}>
            <a
                className={`${styles.button} ${variant === "blue" ? styles.blue : styles.border} ${
                    className ? ` ${className}` : ""
                }`}
                onClick={onClick}
                href={href}
                {...props}
            >
                {leftIcon && (
                    <Icon name={leftIcon} />
                )}
                <p className={`text_16 ${styles.text}`}>{children}</p>
                {rightIcon && (
                    <Icon name={rightIcon} />
                )}
            </a>
        </div>
    )
)

export default Button;