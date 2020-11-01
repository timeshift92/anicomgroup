import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ProductCreate } from "../../features/product/Product"
import { getProducts } from "../../features/product/productSlice"
import { Tab } from "../../features/tab/Tab"
import { getTabs, selectTabs } from "../../features/tab/tabSlice"
import { Dropdown } from "../dropdown/Dropdown"
import { Spinner } from "../spinner/Spinner"
import style from './Header.module.css'

export const Header = () => {


    return (
        <div className={style.header}>

            <HeaderItem />
            <Dropdown items={[
                { name: 'Добавить товар', component: ProductCreate },
                { name: 'Вкладки', component: Tab }
            ]} />

        </div>
    );
}

export const HeaderItem = () => {
    const tabs = useSelector(selectTabs)
    const dispatch = useDispatch();
    const [selectedTabId, changeTabId] = useState('')
    const handleSelect = (tab_id) => {
        changeTabId(tab_id)
        changeHash(tab_id)
    }
    const changeHash = (tab_id) => {
        window.location.hash = tab_id
    }
    useEffect(() => {
        dispatch(getTabs())

        const hashChanged = (e) => {
            let tab_id = ''
            if (window.location.hash) {
                tab_id = window.location.hash.replace('#', '')
            }
            handleSelect(tab_id)
            dispatch(getProducts(tab_id))

        }
        if (window.location.hash) {
            hashChanged()
        }
        window.addEventListener("hashchange", hashChanged, false);
        return () => {
            window.removeEventListener("hashchange", hashChanged, false);
        }
    }, [])
    if (tabs.isLoading) {
        return (
            <Spinner />
        )
    } else {
        return <ul className={style.navbar}>
            <li className={!selectedTabId ? style.active : ''}
                onClick={() => handleSelect('')}> Все</li>
            {tabs.data.map((tab, key) => {
                return <li key={key}
                    className={selectedTabId == tab.id ? style.active : ''}
                    onClick={() => handleSelect(tab.id)}>
                    {tab.name}
                </li>
            })}
        </ul>
    }
}
