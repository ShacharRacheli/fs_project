import { Provider } from 'react-redux'
import './App.css'
import store from './components/redux/store'
import { RouterProvider } from 'react-router'
import { router } from './router'
import Footer from './components/footer'

function App() {

  return (
    <>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    <Footer/>
    </>
  )
}

export default App
