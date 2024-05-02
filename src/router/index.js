import About from '../pages/About';
import Login from '../pages/Login';
import PostIdPage from '../pages/PostIdPage';
import Posts from '../pages/Posts';
import Tasks from '../pages/Tasks';

export const privateRoutes = [
  {path: '/about', element: <About/>},
  {path: '/tasks', element: <Tasks/>},
  {path: '/posts', element: <Posts/>},
  {path: '/posts/:id', element: <PostIdPage/>},
];

export const publicRoutes = [
  {path: '/login', element: <Login/>}
];