import styles from "./Page.module.scss"

export default function Home() {
  return (
    <div>
        <main className="pt-16">
            <section id="main" className={styles.sec}>
                <h1 className="text-6xl text-white font-bold">Начало</h1>
            </section>
            <section id="services" className={styles.sec}>
                <h1 className="text-6xl text-white font-bold">Услуги</h1>
            </section>

            <section id="stages" className={styles.sec}>
                <h1 className="text-6xl text-white font-bold">Этапы</h1>
            </section>

            <section id="projects" className={styles.sec}>
                <h1 className="text-6xl text-white font-bold">Проекты</h1>
            </section>

            <section id="order" className={styles.sec}>
                <h1 className="text-6xl text-white font-bold">Заказать</h1>
            </section>
            <section id="contacts" className={styles.sec}>
                <h1 className="text-6xl text-white font-bold">Контакты</h1>
            </section>
        </main>
    </div>
  );
}
