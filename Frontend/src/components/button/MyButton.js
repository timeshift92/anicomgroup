import './MyButton.module.css'
export const MyButton = ({ type, handleClick, children, inline = false }) => {
    return (
        <my-button onClick={handleClick}
            {...type ? { type } : {}}
            {...inline ? { inline: 'true' } : { inline }}
        >
            {children}
        </my-button>
    )
}
