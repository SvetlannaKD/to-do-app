import {useContext} from 'react';
import {AuthContext} from '../context';
import Button from '../componets/UI/button/Button';
import Input from '../componets/UI/input/Input';


function Login () {

  const {isAuth, setIsAuth} = useContext(AuthContext);

  //Авторизация пользователя (вход)
  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
  };

  return (
    <div>
      <h1>Страница для логина</h1>
      <form onSubmit={login}>
        <Input type='text' placeholder='Введите логин'></Input>
        <Input type='password' placeholder='Введите пароль'></Input>
        <Button>Войти</Button>
      </form>
    </div>
  );
  
}

export default Login;