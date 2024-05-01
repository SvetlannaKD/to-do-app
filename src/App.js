import {BrowserRouter} from 'react-router-dom';
import './styles/App.scss';
import Navbar from './componets/UI/navbar/Navbar';
import AppRouter from './componets/AppRouter';

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <div className='App'>
        <AppRouter/>
      </div>
    </BrowserRouter>
  );

}

export default App;