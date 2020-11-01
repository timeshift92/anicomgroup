import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from '../../components/spinner/Spinner';
import { list, selectTabs, getTabs, updateTab, createTab, deleteTab } from './tabSlice'
import { Modal } from '../../components/modal/Modal'
import style from './Tab.module.css'
import { MyButton } from '../../components/button/MyButton';
import { FormField } from '../../components/form/FormField';

export function Tab() {
    const tabs = useSelector(selectTabs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTabs())
    }, [])

    if (tabs.isLoading) {
        return (
            <Spinner />
        )
    } else {
        return (
            <slot>
                <grid-table className="table">
                    {tabs.data.map((tab, key) => {
                        return (
                            <Content key={key} tab={tab} />
                        )
                    })}
                </grid-table>
                <Modal
                    component={AddTab}
                    cls='add'
                    title="Добавить вкладку" />
            </slot>
        );
    }

}

export function Content({ tab }) {
    const [content, setContent] = useState({
        canChange: false,
        value: tab.name
    })
    const dispatch = useDispatch();

    if (content.canChange) {
        return <slot>
            <input onChange={(e) => setContent({ ...content, value: e.target.value })} value={content.value}></input>
            <MyButton type='accept' handleClick={() => {
                dispatch(updateTab({ ...tab, name: content.value }))
                setContent({ ...content, canChange: false })
            }} > Принять </MyButton>
            <MyButton type='delete' handleClick={() => setContent({ ...content, canChange: false })} > Отменить
            </MyButton>
        </slot>
    } else {
        return <slot>
            {tab.name}
            <MyButton type='update' handleClick={() => setContent({ ...content, canChange: true })} > Изменить </MyButton>
            <MyButton type='delete'
                handleClick={() => dispatch(deleteTab(tab.id))}
            > Удалить </MyButton>
        </slot>
    }
}

export const AddTab = ({ handleClose }) => {
    const tabs = useSelector(selectTabs)
    const [name, setName] = useState('')

    const dispatch = useDispatch();
    return (
        <div className={style.form}>
            <FormField
                name='name'

                handleChange={(e) => setName(e.target.value)}
                label='Название'
                error={tabs.error['name']}
            >
            </FormField>

            <div className={style['form--action']}>
                <MyButton type='add' handleClick={() => {
                    dispatch(createTab(name,handleClose))

                }}>
                    Добавить
                </MyButton>
                <MyButton handleClick={() => handleClose()} type="cancel" > Отмена</MyButton>
            </div>
        </div>
    );
}
