import { ReactNode } from 'react'
import { createPortal } from "react-dom" 

type PortalState = {
    children: ReactNode,
    to?: string
}

const Portal = ({ children, to = 'modal'}: PortalState) => {
    return createPortal( children, document.getElementById(to) as HTMLElement)
}

export default Portal