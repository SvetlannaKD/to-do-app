import {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {AuthContext} from './context';
import './styles/App.scss';
import Navbar from './componets/UI/navbar/Navbar';
import AppRouter from './componets/AppRouter';



function App() {

  const [isAuth, setIsAuth] = useState(false);

  const [isLoading, setLoading] = useState(true);

  //Проверка авторизации пользователя при входе на сайт
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    //Меняем индикатор окончания проверки
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}> 
      <BrowserRouter>
        <Navbar/>
        <div className='App'>
          <AppRouter/>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );

}

export default App;