import style from './FormField.module.css'
export const FormField = ({ name, value = '', label, handleChange, error }) => {
    return <div className={style['form--field']}>
        <label htmlFor={name}>{label} </label>
        <input onChange={handleChange} {...value ? { value } : {}} name={name}></input>
        {error ? <span className={style.error}> {error.join(' ')} </span> : ''}
    </div >
}
