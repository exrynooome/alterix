'use client'

import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import styles from "./Stages.module.scss";
import Icon, {IconName} from "@/components/Icons";
import StageCard from "@/components/StageCard";
import {ArrowButton} from "@/components/Button";
import useTheme from "@/components/ThemeSelector/internal";

const Stages: FunctionComponent = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    interface Stage {
        id: number;
        title: string;
        description: string;
        icon: IconName;
        badgeColor: 'blue' | 'red' | 'green' | 'yellow';
    }

    const stages: Stage[] = [
        {
            id: 1,
            title: "Аналитика",
            description: "Изучаем конкурентов и похожие проекты, собираем лучшие идеи и референсы. Определяем удобную структуру сайта и нужный функционал. Уделяем внимание опыту пользователей — чтобы всё было интуитивно понятно и приятно на любом устройстве",
            icon: "search",
            badgeColor: "blue",
        },
        {
            id: 2,
            title: "Стратегия и структура",
            description: "Формируем карту страниц и сценарии, по которым пользователь будет двигаться по сайту. Продумываем, какие блоки и разделы нужны бизнесу, а от чего можно отказаться, чтобы сайт не был перегружен",
            icon: "plan",
            badgeColor: "blue",
        },
        {
            id: 3,
            title: "Дизайн",
            description: "Создаём макеты и прототипы, подбираем стиль, цвета и типографику, чтобы сайт выглядел современно и аккуратно. Продумываем каждую кнопку, форму и экран, адаптируем дизайн под телефоны и планшеты",
            icon: "pen",
            badgeColor: "red",
        },
        {
            id: 4,
            title: "Разработка",
            description: "Переводим дизайн в чистый адаптивный код, чтобы сайт быстро открывался на разных устройствах и не ломался. Подключаем систему управления, формы, интеграции с сервисами и нужные функции — от оплаты до личного кабинета",
            icon: "code",
            badgeColor: "green",
        },
        {
            id: 5,
            title: "Тестирование и запуск",
            description: "Проверяем, как всё работает: скорость, отображение на разных экранах, формы, оплату, письма. Исправляем ошибки, настраиваем домен, размещаем сайт на надёжном сервере и включаем защиту",
            icon: "star",
            badgeColor: "yellow",
        },
        {
            id: 6,
            title: "Поддержка и развитие",
            description: "Следим за стабильной работой сайта, помогаем с обновлениями и мелкими доработками. Добавляем новые разделы и функции по мере роста бизнеса, улучшаем скорость и конверсию по аналитике",
            icon: "up",
            badgeColor: "yellow",
        },
    ]

    const handleNext = () => {
        console.log('Next clicked, current step:', currentStep);
        setCurrentStep(prev => Math.min(prev + 1, stages.length - 1));
    };

    const handlePrev = () => {
        console.log('Prev clicked, current step:', currentStep);
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            const firstCard = containerRef.current.querySelector(`.${styles.stageContainer}`) as HTMLDivElement;
            if (firstCard) {
                const cardWidth = firstCard.offsetWidth;
                setOffset(currentStep * (cardWidth));
            }
        }
    }, [currentStep]);

    return (
        <section id="stages" className={styles.stages}>
            <h4>Как мы работаем над проектами</h4>
            <div className={styles.wrapper}                     >
                <div
                    ref={containerRef}
                    className={styles.track}
                    style={{ transform: `translateX(-${offset}px)` }}
                >
                    {stages.map((stage, index) => (
                        <div key={stage.id} className={styles.stageContainer}>
                            <div className={styles.stageHeader}>
                                <div className={`${styles.stepBadge} ${index === currentStep ? `${styles.active} ${styles[stage.badgeColor]}` : ''} ${theme === 'light' ? styles.light : ''}`}>
                                    <p className="text_24">{stage.id}</p>
                                    <Icon name={stage.icon} />
                                </div>
                                {index < stages.length - 1 && (
                                    <div className={styles.line} />
                                )}
                            </div>
                            <StageCard title={stage.title} description={stage.description} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.buttons}>
                <ArrowButton arrowDirection={"left"} onClick={handlePrev} disabled={currentStep === 0} />
                <ArrowButton arrowDirection={"right"} onClick={handleNext} disabled={currentStep === stages.length - 1} />
            </div>
        </section>
    );
};

export default Stages;