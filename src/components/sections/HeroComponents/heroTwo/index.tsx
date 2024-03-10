/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.scss";

export default function HeroTwoComponent() {
    return (
        <div
            style={{
                boxShadow: "0 2px 10px rgba(222, 225, 236, 0.7764705882)",
                backgroundImage: `url(https://canvastemplate.com/demos/saas-2/images/hero.svg)`
            }}
            className={`${styles.parent}`}
        >
            <h1 className={styles.heading}>Build Powerful Websites in a flash.</h1>
            <p className={styles.para}>Transforming Your Ideas into Stunning Websites with Intuitive Tools and Limitless Possibilities.</p>
            <div className={styles.actions}>
                <a href="#" className={styles.button}>Get Started</a>
                <a href="#" className={styles.button}>Contact Us</a>
            </div>
        </div>
    );
}
