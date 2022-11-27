import { useCallback, cloneElement, useEffect } from 'react'
import { ModalContentState, ModalInitialState, useModalState, useModalDispatch } from './ModalProvider'
import styles from '@/asset/css/Modal.module.css'

const ModalBody = ({ children } : ModalContentState) => {
    const { data } = useModalState()
    const useDispatch = useModalDispatch()
    const dispatch = (state: any) => useDispatch({type: "SET_STATE", data: state })
    const _children = typeof children === 'function' ? children({state: data, dispatch}) : typeof children === 'string' ? children : cloneElement(children as any, {state: data, dispatch})
    return <div>{_children}</div>
}

const Modal = ({ data, set } : ModalInitialState) => {
    const state = useModalState()
    const dispatch = useModalDispatch()
    const { title, sub, content, size = '', complete = '확인', cancel = '취소', onComplete, onCancel } = data

    const onCompleteHandler = useCallback((data: any) => {
        onComplete({state: data})
        set(null)
    }, [])

    const onCancelHandler = useCallback(() => {
        onCancel()
        set(null)
    }, [])

    useEffect(() => {
        dispatch({ type: "RESET", data: data.initial })
    }, [data])

    return (
        <div className={`${styles.Modal} ${styles.show}`}>
            <article className={`${styles.window} ${size !== "" ? styles[size] : ""}`}>
                <header>
                    <h1>{title}</h1>
                </header>
                <section className='container'>
                    {sub && <h2>{sub}</h2>}
                    <div className={styles.content}>
                        <ModalBody>{content}</ModalBody>
                    </div>
                </section>
                <footer className='footer'>
                    <button className='btn-complete' onClick={() => onCompleteHandler(state.data)}>{complete}</button>
                    <button className='btn-close' onClick={() => onCancelHandler()}>{cancel}</button>
                </footer>
            </article>
        </div>
    )
}

export default Modal