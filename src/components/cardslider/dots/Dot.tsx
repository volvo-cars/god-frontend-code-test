import styles from "./Dot.module.css"
export type DotProps = {
    isActive: boolean;
}

const Dot = (props: DotProps) => <div className={`${styles.dot} ${props.isActive ? styles.active : ''}`} />

export default Dot;