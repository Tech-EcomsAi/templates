import styles from "./styles.module.scss";

export default function HeroOneComponent() {
    return (
        <div className={styles.parent}>
            {/* <svg width="3384" height="2075" viewBox="0 0 3384 2075" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_25_28)">
                    <rect width="3384" height="2075" fill="white" />
                    <rect x="24" width="3384" height="2075" fill="white" />
                    <path d="M1642.88 813.052C1599.97 762.015 1542.74 725.011 1478.59 706.817C1414.44 688.622 1346.31 690.072 1282.99 710.978C1219.67 731.885 1164.07 771.289 1123.36 824.104C1082.66 876.92 1058.72 940.723 1054.63 1007.28C1050.54 1073.83 1066.49 1140.09 1100.43 1197.49C1134.36 1254.89 1184.72 1300.8 1245 1329.3C1305.29 1357.8 1372.73 1367.58 1438.63 1357.37C1504.52 1347.17 1576.48 1304.73 1625.32 1259.33M1639.15 809.022L1856.62 1031.87L1741.35 1141.76" stroke="url(#paint0_linear_25_28)" strokeWidth="113.93" />
                    <path d="M1733.44 1251.97C1776.91 1303.67 1834.88 1341.16 1899.87 1359.59C1964.86 1378.02 2033.88 1376.55 2098.03 1355.38C2162.17 1334.2 2218.5 1294.28 2259.73 1240.77C2300.97 1187.27 2325.22 1122.63 2329.36 1055.21C2333.51 987.785 2317.35 920.667 2282.97 862.518C2248.59 804.368 2197.57 757.857 2136.5 728.985C2075.43 700.114 2007.11 690.209 1940.36 700.548C1873.6 710.887 1799.28 754.577 1749.8 800.569M1737.22 1256.05L1516.91 1030.3L1630.69 918.909" stroke="url(#paint1_linear_25_28)" strokeWidth="113.93" />
                </g>
                <defs>
                    <linearGradient id="paint0_linear_25_28" x1="1053.92" y1="1027.96" x2="1857.64" y2="1027.96" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#29AAE3" />
                        <stop offset="0.498958" stopColor="#0071BD" />
                        <stop offset="1" stopColor="#0051D2" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_25_28" x1="1517.92" y1="1034.18" x2="2329.93" y2="1034.18" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#29AAE3" />
                        <stop offset="1" stopColor="#0054D0" />
                    </linearGradient>
                    <clipPath id="clip0_25_28">
                        <rect width="3384" height="2075" fill="white" />
                    </clipPath>
                </defs>
            </svg> */}

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
