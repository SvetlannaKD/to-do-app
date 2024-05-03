import {useContext} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {privateRoutes, publicRoutes} from '../router';
import {AuthContext} from '../context';
import Loader from './UI/loader/Loader';

function AppRouter () {

  const {isAuth, isLoading} = useContext(AuthContext);
  
  //Проверяем индикатор окончания проверки авторизации пользователя
  if (isLoading) {
    return <Loader/>
  }

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