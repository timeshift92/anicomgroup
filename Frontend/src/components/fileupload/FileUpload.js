import { useEffect, useRef, useState } from 'react';
import style from './FileUpload.module.css'
export const FileUpload = ({ name }) => {
    const inputEl = useRef(null);
    const zone = useRef(null);
    const zoneThumb = useRef(null);
    const [thumb, changeThumb] = useState({})

    useEffect(() => {
        const inputElement = inputEl.current;
        const dropZoneElement = zone.current;

        dropZoneElement.addEventListener("click", (e) => {
            inputElement.click();
        });
        inputElement.addEventListener("change", (e) => {
            if (e.target.files.length) {
                updateThumbnail(e.target.files[0])
            }
        });
        dropZoneElement.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropZoneElement.classList.add("drop-zone--over");
        });

        ["dragleave", "dragend"].forEach((type) => {
            dropZoneElement.addEventListener(type, (e) => {
                dropZoneElement.classList.remove("drop-zone--over");
            });
        });

        dropZoneElement.addEventListener("drop", (e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) {
                inputElement.files = e.dataTransfer.files;
                updateThumbnail(e.dataTransfer.files[0])
            }

            dropZoneElement.classList.remove("drop-zone--over");
        });
        const updateThumbnail = (file) => {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();

                reader.readAsDataURL(file);
                reader.onload = () => {
                    changeThumb({
                        name: file.name,
                        image: reader.result
                    })

                };
            }
        }



    }, [])

    return <div ref={zone} className={style['drop-zone']}>
        <span className={style["drop-zone__prompt"]}>Кликните или перетащите сюда картинку</span>
        <input ref={inputEl} type="file" accept="image/*" name={name} className={style["drop-zone__input"]} />
        {thumb.image ?
            <div ref={zoneThumb}
                data-label={thumb.name}
                style={{
                    backgroundImage: `url('${thumb.image}')`
                }}
                className={style["drop-zone__thumb"]}>

            </div> : ''}

    </div>
}
