import { Route, Routes } from 'react-router'
import './App.css'
import { ProductsByCategory } from './pages/ProductsByCategory'
import { ProductDetails } from './pages/ProductDetails'
import { Navbar } from './components/Navbar'
import { appStore } from './redux/appStore'
import { Provider } from 'react-redux'
import { Checkout } from './pages/Checkout'

function App() {
  return (
    <Provider store={appStore}>
    <Navbar>
      <Routes>
        <Route path='/products/:category' element={<ProductsByCategory />} />
        <Route path='/product/:category/:productId' element={<ProductDetails />} />
        <Route path='/checkout' element={<Checkout/>}/>
      </Routes>
    </Navbar>
    </Provider>
  )
}

export default App
