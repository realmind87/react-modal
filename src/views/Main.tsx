import { useState } from 'react'
import useApp from "@/hooks/useApp"
import Sample from "@/components/Sample"


const Main = () => {
    const app = useApp()
    const [value, setValue] = useState('king dong young')

    const onModalHandler = () => {
        app?.onModal({
            title: 'dddddddd',
            initial: {
                value,
                setValue
            },
            content: (props: any) => {
                console.log(props)

                const onHandler = () => {
                    props.setValue('dddddddddddd')
                }
                
                return (
                    <div onClick={onHandler}>{props.value}</div>
                )                
            },
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
            <div>{value}</div>
            <button onClick={onModalHandler}>modal</button>
        </div>
    )
}

export default Main