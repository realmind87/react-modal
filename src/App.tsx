import { useState, createContext, useEffect } from "react"
import Modal from '@/components/common/modal/Main'
import Router from '@/router/index'
import "@/asset/css/App.css"

export type ModalState = {
    title?: string;
    sub?: string;
    initial?: any;
    size?: string;
    content: any;
    complete?: string,
    cancel?: string,
    onComplete: (props: any) => void;
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
