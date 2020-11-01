import styles from './Spinner.module.css';
export function Spinner() {
    return (
        <div className={styles.spinner} >
            <span className={styles['spinner--pulse-bubble'] + ' ' + styles['spinner--pulse-bubble-1']}  />
            <span className={styles['spinner--pulse-bubble'] + ' ' + styles['spinner--pulse-bubble-2']} />
            <span className={styles['spinner--pulse-bubble'] + ' ' + styles['spinner--pulse-bubble-3']} />
        </div>
    );
}
