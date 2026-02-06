import React, { FunctionComponent } from "react";
import styles from "./Projects.module.scss";
import {ProjectsCards} from "@/types/types";
import ProjectCard from "@/components/ProjectCard";

const Projects: FunctionComponent = () => {

    const projects: ProjectsCards[] = [
        {
            name: "GetBox",
            url: "/",
            image: '/projects/getbox1.png',
            image_2: '/projects/getbox2.png',
            description: "Сервис аренды боксов для хранения вещей в Краснодаре. На сайте можно выбрать и арендовать бокс, оформить аренду, продливать и отслеживать даты через личный кабинет. Можно загрузить документы и обновить личные данные",
        },
        {
            name: "GetBox 2",
            url: "/",
            image: '/projects/getbox1.png',
            image_2: '/projects/getbox2.png',
            description: "Сервис аренды боксов для хранения вещей в Краснодаре. На сайте можно выбрать и арендовать бокс, оформить аренду, продливать и отслеживать даты через личный кабинет. Можно загрузить документы и обновить личные данные",
        },
        {
            name: "GetBox 3",
            url: "/",
            image: '/projects/getbox1.png',
            image_2: '/projects/getbox2.png',
            description: "Сервис аренды боксов для хранения вещей в Краснодаре. На сайте можно выбрать и арендовать бокс, оформить аренду, продливать и отслеживать даты через личный кабинет. Можно загрузить документы и обновить личные данные",
        },
        {
            name: "GetBox 4",
            url: "/",
            image: '/projects/getbox1.png',
            image_2: '/projects/getbox2.png',
            description: "Сервис аренды боксов для хранения вещей в Краснодаре. На сайте можно выбрать и арендовать бокс, оформить аренду, продливать и отслеживать даты через личный кабинет. Можно загрузить документы и обновить личные данные",
        },
        {
            name: "GetBox 5",
            url: "/",
            image: '/projects/getbox1.png',
            image_2: '/projects/getbox2.png',
            description: "Сервис аренды боксов для хранения вещей в Краснодаре. На сайте можно выбрать и арендовать бокс, оформить аренду, продливать и отслеживать даты через личный кабинет. Можно загрузить документы и обновить личные данные",
        },
    ]

    return (
        <section id="projects" className={styles.projects}>
            <h4>Сайты, которые мы разработали</h4>
            <div className={styles.cards}>
                {projects.map((item) => (
                    <ProjectCard key={item.name} card={item} />
                ))}
            </div>
        </section>
    );
};

export default Projects;