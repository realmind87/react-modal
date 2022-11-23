import useApp from "@/hooks/useApp"

const Main = () => {
    const app = useApp()
    const onModalHandler = () => {
        app?.onModal({
            title: 'dddddddd',
            content: 'ddsdssds',
            onComplete: () => {
                console.log('complete')
            },
            onCancel: () => {
                console.log("cancel")
            }
        })
    }

    return (
        <div>
            <h1>Main</h1>
            <button onClick={onModalHandler}>modal</button>
        </div>
    )
}

export default Main