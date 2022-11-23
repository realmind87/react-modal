import React, { useState, createContext, useEffect } from "react"
import Modal from '@/components/common/Modal'
import Router from '@/router/index'



export type ModalState = {
    title?: string;
    sub?: string;
    content: any;
    complete?: string,
    cancel?: string,
    onComplete: () => void;
    onCancel: () => void
}

export type AppState = {
    onModal: (data: ModalState) => void,
}

export const AppContext = createContext<AppState | null>(null)

const App = () => { 
    const [global, setGlobal] = useState<AppState | null>(null)
    const [modal, setModal] = useState<ModalState | null>(null)
    const onModal = (data: ModalState) => setModal(data)

    useEffect(() => {
        setGlobal(prevStus => ({
            ...prevStus,
            onModal
        }))
    }, [modal])
    
    return (
        <AppContext.Provider value={global}>
            <Router />
            {modal && <Modal data={modal} set={setModal} />} 
        </AppContext.Provider>
    );
}

export default App;
