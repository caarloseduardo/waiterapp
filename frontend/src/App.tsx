import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Header } from './components/Header'
import { Orders } from './components/Orders'

export function App() {
  return (
    <div>
      <Header />
      <Orders />
      <ToastContainer position="bottom-center" />
    </div>
  )
}
