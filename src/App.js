import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './layout/Main';
import Home from './Pages/Home/Home';
import Media from './Pages/media/Media';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PostDetails from './Pages/media/PostDetails';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import About from './Pages/About/About';

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
        },
        {
          path : '/media/:id',
          loader : ({params}) => fetch(`https://connect-server-gamma.vercel.app/posts/${params.id}`),
          element : <PrivateRoute><PostDetails/></PrivateRoute>
        },
        {
          path : '/about',
          element : <PrivateRoute><About/></PrivateRoute>
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
