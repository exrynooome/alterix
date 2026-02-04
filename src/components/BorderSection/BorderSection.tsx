import {FunctionComponent} from "react";
import styles from './BorderSection.module.scss'

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    id: string;
}

const BorderSection: FunctionComponent<Props> = ({
                                                    id,
                                                    children,
                                                 }) => {



    return (
        <section id={id} className={styles.borderedBlock}>
            {children}
        </section>
    )
}

export default BorderSection