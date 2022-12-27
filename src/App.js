import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './layout/Main';
import Home from './Pages/Home/Home';

function App() {
  const router = createBrowserRouter([
    {
      path : '/',
      element : <Main/>,
      children : [
        {
          path : '/',
          element : <Home/>
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
