import { Provider } from 'react-redux'
import './App.css'
import store from './components/redux/store'
import { RouterProvider } from 'react-router'
import { router } from './router'

function App() {

  return (
    <>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    </>
  )
}

export default App
