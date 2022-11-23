import React, { Dispatch, SetStateAction, useEffect, ReactNode, useCallback, cloneElement } from 'react'
import Portal from './Portal'
import { ModalState } from '@/App'

type ModalInitialState = {
    data: ModalState,
    set: Dispatch<SetStateAction<ModalState | null>>
}

type ModalContentState = {
    children: ReactNode | Function;
    initial: string | object | Function | any | null;
}

const ModalBody = ({ children, initial }: ModalContentState) => {
    // if (typeof content === 'string') return <div>{content}</div>
    // else if (typeof content === 'object') return <div>{content}</div>
    // else if (typeof content === 'function') return <div>{content()}</div>
    
    const _children = typeof children === 'function' ? children(initial) : typeof children === 'string' ? children : cloneElement(children as any, {...initial})

    return (
        <div>{_children}</div>
    )
}

const Modal = ({ data, set } : ModalInitialState) => {
    const { title, sub, content, initial = {}, complete = '확인', cancel = '취소', onComplete, onCancel } = data

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
                            <ModalBody initial={initial}>
                                {content}
                            </ModalBody>
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