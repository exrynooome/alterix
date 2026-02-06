import {FunctionComponent} from "react";
import styles from './StageCard.module.scss'

type Props = {
    title: string;
    description: string;
}

const StageCard: FunctionComponent<Props> = ({
                                                 title,
                                                 description,
                                             }) => {



    return (
        <div>
            <div className={styles.card}>
                <p className="text_24">{title}</p>
                <p className={`${styles.description}`}>{description}</p>
            </div>
        </div>
    )
}

export default StageCard