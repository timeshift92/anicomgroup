import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MyButton } from "../../components/button/MyButton"
import { Spinner } from "../../components/spinner/Spinner"
import { createProduct, deleteProduct, getProducts, selectProducts } from "./productSlice"
import style from './Product.module.css'
import { FormField } from "../../components/form/FormField"
import { selectTabs } from "../tab/tabSlice"
import { FileUpload } from "../../components/fileupload/FileUpload"

export const Product = () => {
    const products = useSelector(selectProducts)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    if (products.isLoading) {
        return (
            <Spinner />
        )
    } else {
        return (
            <slot>
                <grid-table product className="table">
                    {products.data.map((product, key) => {
                        return (
                            <Content key={key} product={product} />
                        )
                    })}
                </grid-table>
            </slot>
        );
    }
}

export function Content({ product }) {
    const dispatch = useDispatch();
    return (
        <slot>
            <div><img src={product.image}></img> </div>
            <div> {product.name}</div>
            <div> {product.price} руб.</div>
            <div> {product.tab_name}</div>
            <div> {product.count} шт.</div>
            <div>
                <MyButton type='delete'
                    handleClick={() => dispatch(deleteProduct(product.id))}
                > Удалить </MyButton>
            </div>
        </slot >
    )
}


export const ProductCreate = ({ handleClose }) => {
    const tabs = useSelector(selectTabs)
    const products = useSelector(selectProducts)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        dispatch(createProduct(formData, handleClose))


    }
    return (
        <form action="#" id="productForm" encType="multipart/form-data" onSubmit={handleSubmit}>
            <FormField name='name' label='Название' error={products.error['name']} />
            <FormField name='price' label='Цена' error={products.error['price']} />
            <FormField name='count' label='Количество' error={products.error['count']} />
            {products.error['tab_id'] ? <span className={style.error}> {products.error['tab_id'].join(' ')} </span> : ''}
            <select className={style.select} name="tab_id">
                {tabs.data.map((tab, key) => <option key={key} value={tab.id}> {tab.name} </option>)}
            </select>
            {products.error['image'] ? <span className={style.error}> {products.error['image'].join(' ')} </span> : ''}
            <FileUpload name="image" />
            <div className={style['form--action']}>
                <button className={style.submit} type="submit"> Добавить </button>
                <MyButton handleClick={() => handleClose()} type="cancel" > Отмена</MyButton>
            </div>
        </form>
    )
}
