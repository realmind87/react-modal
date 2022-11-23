import React, { Dispatch, SetStateAction, useEffect, ReactNode, useCallback } from 'react'
import Portal from './Portal'
import { ModalState } from '@/App'

type ModalInitialState = {
    data: ModalState,
    set: Dispatch<SetStateAction<ModalState | null>>
}

type ModalContentState = {
    children?: ReactNode;
    content: string | JSX.Element | ReactNode;
}

const ModalBody = ({ content } : ModalContentState) => {
    return (
        <div>
            {content}
        </div>
    )
}

const Modal = ({ data, set } : ModalInitialState) => {
    const { title, sub, content, complete = '확인', cancel = '취소', onComplete, onCancel } = data

    const onCompleteHandler = useCallback(() => {
        onComplete()
        set(null)
    }, [])

    const onCancelHandler = useCallback(() => {
        onCancel()
        set(null)
    }, [])

    return (
        <Portal to='modal'>
            {data && (
                <article>
                    <header>
                        <h1>{title}</h1>
                    </header>
                    <section className='modal__container'>
                        {sub && <h2>{sub}</h2>}
                        <div className='modal__content'>
                            <ModalBody content={content} />
                        </div>
                    </section>
                    <footer>
                        <button onClick={onCompleteHandler}>{complete}</button>
                        <button onClick={onCancelHandler}>{cancel}</button>
                    </footer>
                </article>
            )}
        </Portal>
    )
}

export default Modal