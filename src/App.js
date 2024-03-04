// import logo from './logo.svg';
import { useState } from 'react';
import {nanoid} from 'nanoid';
import './styles/App.scss';
import TaskList from './componets/TaskList';
import TaskForm from './componets/TaskForm';
import Select from './componets/UI/select/Select';
import Input from './componets/UI/input/Input';

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

  console.log("---render App---"); 

  const [tasks, setTasks] = useState(initTasks);

  const [selectedSort, setSelectedSort] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const isQueryInString = (string, query) => {
    return string.toLowerCase().includes(query.toLowerCase());
  };

  const getSearchQueryTasks = () =>{
    return (
      [...tasks].filter((el) =>{
        return (
          isQueryInString(el.title, searchQuery) || isQueryInString(el.text, searchQuery)
        );
      })
    );
  };

  const getSortedTasks = () => {

    const searchTasks = searchQuery ? getSearchQueryTasks() : tasks;
    if (selectedSort) {
      // return [...tasks].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
      return [...searchTasks].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
    }
    // return tasks;
    return searchTasks;
  };

  const sortedTasks = getSortedTasks();
  
  const createTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const removeTask = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));  
  };
  
  const sortTasks = (valueSort) => {
    setSelectedSort(valueSort);
  };

  return (
    <div className="App">
      <div className="tasks">
        <TaskForm create={createTask}/>
        <hr style={{margin: "15px 0"}}></hr>
        <div className="tasks__search">
          <Input type="text" placeholder="Поиск..." value={searchQuery} onChange={(ev) => setSearchQuery(ev.target.value)}/>
        </div>
        <Select 
          value={selectedSort}
          onChange={sortTasks}
          defaultValue="Сортировка" 
          options={[
            {value: "title", name: "По названию"},
            {value: "text", name: "По описанию"}
          ]}
          selectClass={"select"}
        />
        {tasks.length 
          ? 
          <TaskList tasks={sortedTasks} title="Список дел" removeTask={removeTask}/> 
          : 
          <h1 style={{textAlign: "center"}} className="tasks__title">Список дел пустой!</h1>
        }
      </div>
    </div>
  );
}

export default App;
