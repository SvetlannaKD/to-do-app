// import logo from './logo.svg';
import { useMemo, useState } from 'react';
import {nanoid} from 'nanoid';
import './styles/App.scss';
import TaskList from './componets/TaskList';
import TaskForm from './componets/TaskForm';
import TaskFilter from './componets/TaskFilter';
import Modal from './componets/UI/modal/Modal';
import Button from './componets/UI/button/Button';

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

  const [filter, setFilter] = useState({sort: "", query: ""});

  const [modal, setModal] = useState(false);

  const sortedTasks = useMemo(() => {
    if (filter.sort) {
      return [...tasks].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return tasks;
  }, [filter.sort, tasks]);

  const isQueryInString = (string, query) => {
    return string.toLowerCase().includes(query.toLowerCase());
  };

  const sortedAndSearchedTasks = useMemo(() => {
    if (filter.query && filter.query !== " ") {
      return (
          sortedTasks.filter((post) => {
            return isQueryInString(post.title, filter.query) || isQueryInString(post.text, filter.query);
          })
        );
    }
    return sortedTasks;
  }, [filter.query, sortedTasks]);
  
  const createTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setModal(false);
  };

  const removeTask = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));  
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
      </div>
    </div>
  );
}

export default App;
