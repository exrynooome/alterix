import { FunctionComponent } from "react";
import styles from './BorderSection.module.scss'

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    id?: string;
    color: 'blue' | 'purple';
}

const BorderSection: FunctionComponent<Props> = ({
                                                    id,
                                                    children,
                                                    color,
                                                 }) => {



    return (
        <section id={id} className={`${styles.container} ${styles[color]}`}>
            <div className={styles.borderedBlock}>
                {children}
            </div>
        </section>
    )
}

export default BorderSection;