// import logo from './logo.svg';
import { useState } from 'react';
import {nanoid} from 'nanoid';
import './styles/App.scss';
import TaskList from './componets/TaskList';
import TaskForm from './componets/TaskForm';

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
  
  function createTask (newTask) {
     setTasks([...tasks, newTask]);
  }

  function removeTask (task) {
      setTasks(tasks.filter((t) => t.id !== task.id));  
  }

  return (
    <div className="App">
      <div className="tasks">
        <TaskForm create={createTask}/>
        <TaskList tasks={tasks} title="Список дел" removeTask={removeTask}/>
      </div>
    </div>
  );
}

export default App;
