import { FunctionComponent } from "react";
import styles from './ProjectCard.module.scss'
import { ProjectsCards } from "@/types/types";
import Image from "next/image";
import Button from "@/components/Button";

interface Props {
    card: ProjectsCards;
}

const ProjectCard: FunctionComponent<Props> = ({
                                                    card
                                               }) => {

    return (
        <div className={styles.card}>
            <div className={styles.desktop}>
                <div className={styles.left}>
                    <div className={styles.image}>
                        <Image src={card.image} alt="image project" fill={true}/>
                    </div>
                    <p className="text_24">{card.name}</p>
                </div>
                <div className={styles.right}>
                    <div className={styles.image}>
                        <Image src={card.image_2} alt="2 image project" fill={true}/>
                    </div>
                    <p className={styles.description}>{card.description}</p>
                    <Button variant="border" href={card.url} rightIcon="link">Смотреть проект</Button>
                </div>
            </div>

            <div className={styles.mobile}>
                <div className={styles.images}>
                    <div className={styles.image}>
                        <Image src={card.image_2} alt="2 image project" fill={true}/>
                    </div>
                    <div className={styles.image}>
                        <Image src={card.image} alt="image project" fill={true}/>
                    </div>
                </div>
                <div className={styles.text__block}>
                    <div className={styles.text}>
                        <p className="text_24">{card.name}</p>
                        <p className={styles.description}>{card.description}</p>
                    </div>
                    <Button variant="border" href={card.url} rightIcon="link">Смотреть проект</Button>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;