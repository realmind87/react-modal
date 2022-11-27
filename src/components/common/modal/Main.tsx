import Portal from '../Portal'
import ModalProvider, { ModalInitialState } from './ModalProvider'
import Modal from './Modal'

const Main = ({ data, set }: ModalInitialState) => {
    return (
        <Portal to='modal'>
            {data &&
                <ModalProvider data={data.initial}>
                    <Modal data={data} set={set} />
                </ModalProvider>
            }
        </Portal>
    )
}

export default Main