import Button from '../componets/UI/button/Button';
import Input from '../componets/UI/input/Input';

function Login () {

  return (
    <div>
      <h1>Страница для логина</h1>
      <form>
        <Input type='text' placeholder='Введите логин'></Input>
        <Input type='password' placeholder='Введите пароль'></Input>
        <Button>Войти</Button>
      </form>
    </div>
  );
  
}

export default Login;