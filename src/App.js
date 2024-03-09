// import logo from './logo.svg';
import {useMemo, useState} from 'react';
import {nanoid} from 'nanoid';
import {useList} from './hooks/useList';
import axios from 'axios'
import './styles/App.scss';
import TaskList from './componets/TaskList';
import TaskForm from './componets/TaskForm';
import TaskFilter from './componets/TaskFilter';
import Modal from './componets/UI/modal/Modal';
import Button from './componets/UI/button/Button';
import PostsList from './componets/PostsList';
import PostsFilter from './componets/PostsFilter';
import { useEffect } from 'react';

const initTasks = [
  {
    id: nanoid(10),
    title: "Купить продукты",
    text: "Молоко, картошка, мясо"
  },
  {
    id: nanoid(10),
    title: "Убраться в квартире",
    text: "Избавиться от старых ненужных вещей"
  },
  {
    id: nanoid(10),
    title: "Позвонить Диме",
    text: "Позвать на рыбалку"
  }
];

function App() {

  const [tasks, setTasks] = useState(initTasks);

  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort: "", query: ""});

  const [filterPosts, setFilterPosts] = useState({sort: "", query: ""});

  const [modal, setModal] = useState(false);

  const sortedAndSearchedTasks = useList(tasks, filter.sort, filter.query);

  const sortedAndSearchedPosts = useList(posts, filterPosts.sort, filterPosts.query);

  useEffect(() => {
    fetchPosts();
  }, []);
  
  const createTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setModal(false);
  };

  async function fetchPosts () {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    console.log(response.data);
    setPosts(response.data);
  }

  const removeTask = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));  
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));  
  };

  return (
    <div className="App">
      <div className="tasks">
        <Button buttonClass={"tasks__button"} onClick={() => setModal(true)}>Создать новое дело</Button>
        <Modal visible={modal} setVisible={setModal}>
          <TaskForm create={createTask}/>
        </Modal>
        <hr style={{margin: "15px 0"}}></hr>
        <TaskFilter filter={filter} setFilter={setFilter}/>
        <TaskList tasks={sortedAndSearchedTasks} title="Список дел" removeTask={removeTask}/> 
        <hr style={{margin: "15px 0"}}></hr>
        <PostsFilter filter={filterPosts} setFilter={setFilterPosts}/>
        <PostsList posts={sortedAndSearchedPosts} title="Список постов" removePost={removePost}/> 
      </div>
    </div>
  );
}

export default App;
