import React, { createContext, ReactNode, useContext, Dispatch, SetStateAction, useReducer, useEffect } from "react";
import { ModalState } from "@/App"

export const SET_STATE: string = "SET_STATE"

type State = { data: any }
type Action = { type: "RESET", data: any } | { type: "SET_STATE", data: any }

export type ModalInitialState = {
    data: ModalState,
    set: Dispatch<SetStateAction<ModalState | null>>
}

export type ModalContentState = {
    children: ReactNode | Function;
}

const initializer = (initialState: State) => ({ data: initialState })
const ModalStateContext = createContext<State | null>(null)
const ModalActionContext = createContext<Dispatch<Action> | null>(null)

const reducer = (state: State, action: Action) : State => {
    switch(action.type) {
        case "RESET":
            return initializer(action.data)
        case "SET_STATE":
            return {
                ...state,
                data: action.data
            }
        default: throw new Error('Unhandled action');
    }
}

const ModalProvider = ({ children, data } : { children: React.ReactNode, data: any }) => {
    const [state, action] = useReducer(reducer, data, initializer)

    return (
        <ModalStateContext.Provider value={state}>
            <ModalActionContext.Provider value={action}>
                {children}
            </ModalActionContext.Provider>
        </ModalStateContext.Provider>
    )
}

export const useModalState = () => {
    const state = useContext(ModalStateContext)
    if (!state) throw new Error('Cannot find state')
    return state
}

export const useModalDispatch = () => {
    const dispatch = useContext(ModalActionContext)
    if (!dispatch) throw new Error('Cannot find action')
    return dispatch
}

export default ModalProvider

