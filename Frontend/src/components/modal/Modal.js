import { useState } from 'react'
import ReactModal from 'react-modal';
import { MyButton } from '../button/MyButton';
import CloseIcon from './close.png'


import style from './Modal.module.css'
export const Modal = ({ component, title, cls, inline = false }) => {
    const Component = component
    const [isOpen, setIsOpen] = useState(false)
    ReactModal.setAppElement('body')
    return (
        <div className={cls ? style['modal-main'] : ''}>
            <MyButton inline={inline} type={cls} handleClick={() => setIsOpen(!isOpen)}>
                {title}
            </MyButton>

            <ReactModal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className={style.modal}
                overlayClassName={style.overlay}
            >
                <img onClick={(e) => {
                    e.preventDefault()
                    setIsOpen(false)
                }} className={style.close} src={CloseIcon} />
                <div className={style.content}>
                    <span>{title}</span>
                    <Component handleClose={() => setIsOpen(false)} className={style['content--body']} />
                </div>
            </ReactModal>
        </div >
    )
}
