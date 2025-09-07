import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import { ProductsByCategory } from './pages/ProductsByCategory'
import { ProductDetails } from './pages/ProductDetails'
import { Navbar } from './components/Navbar'
import { appStore } from './redux/appStore'
import { Provider } from 'react-redux'
import { Checkout } from './pages/Checkout'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <Provider store={appStore}>
    <Navbar>
      <Routes>
        <Route path='/products/:category' element={<ProductsByCategory />} />
        <Route path='/product/:category/:productId' element={<ProductDetails />} />
        <Route path='/checkout' element={<Checkout/>}/>
        {/*Catch all*/}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Navbar>
    </Provider>
  )
}

export default App
