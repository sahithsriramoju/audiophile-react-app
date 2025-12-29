import { Route, Routes } from 'react-router'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css'
import { ProductsByCategory } from './pages/ProductsByCategory'
import { ProductDetails } from './pages/ProductDetails'
import { Navbar } from './components/Navbar'
import { appStore, persistor, } from './redux/appStore'
import { Provider } from 'react-redux'
import { Checkout } from './pages/Checkout'
import { NotFound } from './pages/NotFound'
import { UserProfile } from './pages/UserProfile'
import { ProtectedRoute } from './components/Auth/ProtectedRoute'
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp'
import { ConfirmSignUp } from './pages/ConfirmSignUp'
import { AuthBootstrapper } from './components/Auth/AuthBootstrapper'


function App() {


  return (
    <Provider store={appStore}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthBootstrapper/>
      <Navbar>
      <Routes>
       <Route path='/products/:category' element={<ProductsByCategory />} />
        <Route path='/product/:category/:productId' element={<ProductDetails />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/confirm-signup' element={<ConfirmSignUp />} />
        <Route element={<ProtectedRoute/>}>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/dashboard' element={<UserProfile/>}/>
        </Route>
        {/*Catch all*/}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Navbar>
    </PersistGate>
    </Provider>
  )
}

export default App
