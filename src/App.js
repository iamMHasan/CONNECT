import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './layout/Main';
import Home from './Pages/Home/Home';
import Media from './Pages/media/Media';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  const router = createBrowserRouter([
    {
      path : '/',
      element : <Main/>,
      children : [
        {
          path : '/',
          element : <Home/>
        },
        {
          path : '/media',
          element : <Media/>
        },
        {
          path : '/login',
          element : <Login/>
        },
        {
          path : '/signup',
          element : <Register/>
        }
      ]
    }
  ])
  return (
    <div className='' >
     <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
