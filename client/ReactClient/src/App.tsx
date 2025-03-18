import { Provider } from 'react-redux'
import './App.css'
import AllChallenges from './components/challenges/allChallenges'
import FileUploader from './components/Pictures/uploadPicture'
import Login from './components/User/login'
import Register from './components/User/register'
import Update from './components/User/update'
import store from './components/redux/store'
import { RouterProvider } from 'react-router'
import { router } from './router'

function App() {

  return (
    <>
  {/* <Login/> */}
      {/* <Register/> */}
      {/* <Update/> */}
      <Provider store={store}>
        {/* <AllChallenges/> */}

    <RouterProvider router={router} />

    </Provider>
      {/* <FileUploader/> */}
    </>
  )
}

export default App
