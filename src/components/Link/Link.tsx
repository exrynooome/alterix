import React from "react";
import styles from "./Link.module.scss";
import Link from "next/link";

type Props = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    size: "small" | "medium" | "large";
    variant: "mainColor" | "secondaryColor";
    href: string;
    error?: string;
}

const TextLink: React.FC<Props> = ({
                                   size,
                                   className,
                                   onClick,
                                   href,
                                   children,
                                   variant,
                                   error,
                                   ...props
                               }) => (
    (
        <Link
            className={`${styles.link} ${styles[size]} ${styles[variant]} ${className ? ` ${styles[className]}` : ""} ${error ? styles.error: ''}`}
            onClick={onClick}
            href={href}
            {...props}
        >
            {children}
        </Link>
    )
)

export default TextLink;