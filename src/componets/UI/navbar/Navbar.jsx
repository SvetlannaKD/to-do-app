import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../../context';
import Button from '../button/Button';



function Navbar () {

  const {isAuth, setIsAuth} = useContext(AuthContext);

  //Отмена авторизации (выход)
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  };

  return (
    <div className='navbar'>
      {isAuth && <Button onClick={logout}>Выйти</Button>}
      <div className='navbar__links'>
        <Link to='/about'>О сайте</Link>
        <Link to='/tasks'>Задачи</Link>
        <Link to='/posts'>Посты</Link>
      </div>
    </div>
  );

}

export default Navbar;