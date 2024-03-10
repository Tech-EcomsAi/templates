import styles from "./styles.module.scss";

export default function HeroOneComponent() {
    return (
        <div className={styles.parent}>
            <h1 className={styles.heading}>The ultimate template for sale</h1>
            <p className={styles.para}>
                Hellix provides you with everything you need to build high converting
                SaaS website and make an impact.
            </p>
            <div className={styles.actions}>
                <div className={styles.primaryCTA}>Buy Template</div>
                <div className={styles.secondaryCTA}>View Template</div>
            </div>
        </div>
    );
}
