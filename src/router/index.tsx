import { Route, Routes } from 'react-router-dom'
import Main from '@/views/Main'
import Sub from '@/views/Sub'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/' element={<Sub />} />
        </Routes>
    )
}

export default Router