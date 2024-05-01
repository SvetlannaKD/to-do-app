// import logo from './logo.svg';
import {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import {useList} from './hooks/useList';
import {useFetching} from './hooks/useFetching';
import {getPageCount} from './utils/pages';
import PostService from './API/PostService';
import './styles/App.scss';
import TaskList from './componets/TaskList';
import TaskForm from './componets/TaskForm';
import TaskFilter from './componets/TaskFilter';
import Modal from './componets/UI/modal/Modal';
import Button from './componets/UI/button/Button';
import PostsList from './componets/PostsList';
import PostsFilter from './componets/PostsFilter';
import Loader from './componets/UI/loader/Loader';
import Pagination from './componets/UI/pagination/Pagination';



const initTasks = [
  {
    id: nanoid(10),
    title: 'Купить продукты',
    text: 'Молоко, картошка, мясо'
  },
  {
    id: nanoid(10),
    title: 'Убраться в квартире',
    text: 'Избавиться от старых ненужных вещей'
  },
  {
    id: nanoid(10),
    title: 'Позвонить Диме',
    text: 'Позвать на рыбалку'
  }
];

function App() {

  const [tasks, setTasks] = useState(initTasks);

  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort: '', query: ''});

  const [filterPosts, setFilterPosts] = useState({sort: '', query: ''});

  const [modal, setModal] = useState(false);

  const [totalPages, setTotalPages] = useState(0); //сколько будет страниц (10 страниц)

  const [limit, setLimit] = useState(10); //сколько постов выводить на странице (10 шт.)

  const [page, setPage] = useState(1); //номер страницы

  const sortedAndSearchedTasks = useList(tasks, filter.sort, filter.query);

  const sortedAndSearchedPosts = useList(posts, filterPosts.sort, filterPosts.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async(limit, page) => {
    const response = await PostService.getAll(limit, page);
    setTimeout(()=>console.log("postError:", postError), 10000);
    setPosts(response.data);//получаем ответ от сервера
    const totalCount = response.headers['x-total-count'] //получаем общее количество постов на сервере(100 шт.)
    setTotalPages(getPageCount(totalCount, limit));
  });

  //Загрузка постов по API
  useEffect(() => {
    fetchPosts(limit, page);
  }, []);
  
  const createTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setModal(false);
  };

  const removeTask = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));  
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));  
  };

  //Изменение номера страницы
  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
  }

  return (
    <div className='App'>
      <div className='tasks'>
        <Button buttonClass={'tasks__button'} onClick={() => setModal(true)}>Создать новое дело</Button>
        <Modal visible={modal} setVisible={setModal}>
          <TaskForm create={createTask}/>
        </Modal>
        <hr style={{margin: '15px 0'}}></hr>
        <TaskFilter filter={filter} setFilter={setFilter}/>
        <TaskList tasks={sortedAndSearchedTasks} title='Список дел' removeTask={removeTask}/> 
      </div>
      <div className='posts'>
        <hr style={{margin: '15px 0'}}></hr>
        <PostsFilter filter={filterPosts} setFilter={setFilterPosts}/>
        {postError && <h1>Произошла ошибка: {postError}</h1>}
        {isPostsLoading 
          ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
              <Loader />
            </div>
          : <PostsList posts={sortedAndSearchedPosts} title='Список постов' removePost={removePost}/> 
        }
        <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
      </div>
    </div>
  );

}

export default App;
