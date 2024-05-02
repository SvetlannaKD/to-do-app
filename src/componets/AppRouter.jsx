import {Navigate, Route, Routes} from 'react-router-dom';
// import About from '../pages/About';
// import Posts from '../pages/Posts';
// import Error from '../pages/Error';
// import Tasks from '../pages/Tasks';
// import PostIdPage from '../pages/PostIdPage';
import {privateRoutes, publicRoutes} from '../router';

function AppRouter () {

  const isAuth = true;

  return (
    isAuth
      //Маршруты для авторизованного пользователя
      ? <Routes> 
        {/* <Route path={'/about'} element={<About/>}/>
        <Route path={'/tasks'} element={<Tasks/>}/>
        <Route path={'/posts'} element={<Posts/>}/>
        <Route path={'/posts/:id'} element={<PostIdPage/>}/> */}
        {privateRoutes.map(route =>
          <Route key={route.path} path={route.path} element={route.element}/>
        )}
        {/* <Route path={'/error'} element={<Error/>}/>
        <Route path={'*'} element={<Navigate to='/error' replace/>}/> - редирект все остальные пути, которые не прописаны в маршрутах роутера*/}
        <Route path={'*'} element={<Navigate to='/posts' replace/>}/>
      </Routes>
      //Маршруты для неавторизованного пользователя (страница Логина)
      : <Routes>
        {publicRoutes.map(route =>
        <Route key={route.path} path={route.path} element={route.element}/>
        )}
        <Route path={'*'} element={<Navigate to='/login' replace/>}/>
      </Routes>
      
  );
  
}

export default AppRouter;