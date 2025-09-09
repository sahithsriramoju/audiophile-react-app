import { Route, Routes } from 'react-router'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css'
import { ProductsByCategory } from './pages/ProductsByCategory'
import { ProductDetails } from './pages/ProductDetails'
import { Navbar } from './components/Navbar'
import { appStore, persistor } from './redux/appStore'
import { Provider } from 'react-redux'
import { Checkout } from './pages/Checkout'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <Provider store={appStore}>
    <PersistGate loading={null} persistor={persistor}>
    <Navbar>
      <Routes>
       <Route path='/products/:category' element={<ProductsByCategory />} />
        <Route path='/product/:category/:productId' element={<ProductDetails />} />
        <Route path='/checkout' element={<Checkout/>}/>
        {/*Catch all*/}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Navbar>
    </PersistGate>
    </Provider>
  )
}

export default App
