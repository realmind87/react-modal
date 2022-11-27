import React, { useState } from 'react'
import useApp from "@/hooks/useApp"
import Sample from "@/components/Sample"

const Main = () => {
    const app = useApp()
    const [value, setValue] = useState('첫번째 모달 내용')

    const onModalHandler = () => {
        app?.onModal({
            title: '첫번째 모달 제목',
            initial: {
                nickname: "",
                age: ""
            },
            content: (props: any) => {
                const { state, dispatch } = props
                const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch({...state, [e.target.name]: e.target.value})
                }
                return (
                    <ul>
                        <li>
                            <label htmlFor='nickname'>닉네임</label>
                            <input type="text" id="nickname" name="nickname" value={state.nickname} onChange={onChange} />
                        </li>
                        <li>
                            <label htmlFor='age'>나이</label>
                            <input type="text" id="age" name="age" value={state.age} onChange={onChange} />
                        </li>
                    </ul>
                )
            },
            onComplete: (props: any) => {
                console.log(props.state)
                console.log('complete')
            },
            onCancel: () => {
                console.log("cancel")
            }
        })
    }

    const onSecondModalHandler = () => {
        app?.onModal({
            title: '두번째 모달',
            content: "두번째 모달 내용임",
            onComplete: (props: any) => {
                console.log('complete')
            },
            onCancel: () => {
                console.log("cancel")
            }
        })
    }

    const onLastModalHandler = () => {
        app?.onModal({
            title: '세번째 모달 제목',
            size: 'lg',
            content: <Sample />,
            onComplete: (props: any) => {
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
            <button onClick={onModalHandler}>modal1</button>

            <button onClick={onSecondModalHandler}>modal2</button>

            <button onClick={onLastModalHandler}>modal3</button>
        </div>
    )
}

export default Main