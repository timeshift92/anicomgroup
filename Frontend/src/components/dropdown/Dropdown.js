import { useState } from "react"
import style from './Dropdown.module.css'
import caretDown from './caret-down.png'
import caretUp from './caret-up.png'
import { Modal } from "../modal/Modal"
export const Dropdown = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false)
    const caret = isOpen ? caretUp : caretDown
    return (
        <div className={style.dropdown + ' ' + style.action} onClick={() => setIsOpen(!isOpen)}>
            <div className={style['dropdown--wrapper']}>
                <span >
                    Управление
            </span>
                <img src={caret} alt="no image" />
            </div>

            <div className={isOpen ? style.opened : style.closed}>
                {items.map((item, key) => <Modal inline={true} key={key} component={item.component} title={item.name} />)}
            </div>
        </div>
    )
}
