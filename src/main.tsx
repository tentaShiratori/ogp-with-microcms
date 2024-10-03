import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Link, RouterProvider, useParams } from 'react-router-dom'
import App from './components/App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/api/blogs/:id",
    Component: ()=>{
      const params = useParams<{id:string}>();
    return <div>blogs { params.id}<Link to="/">ホームへ</Link></div>
    },
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
 <RouterProvider router={router} />
  </StrictMode>,
)
