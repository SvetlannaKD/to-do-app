import {useState} from 'react';
import {nanoid} from 'nanoid';
import {useList} from '../hooks/useList';
import TaskFilter from '../componets/TaskFilter';
import TaskForm from '../componets/TaskForm';
import TaskList from '../componets/TaskList';
import Button from '../componets/UI/button/Button';
import Modal from '../componets/UI/modal/Modal';


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

function Tasks () {

  const [tasks, setTasks] = useState(initTasks);

  const [filter, setFilter] = useState({sort: '', query: ''});

  const [modal, setModal] = useState(false);

  const sortedAndSearchedTasks = useList(tasks, filter.sort, filter.query);

  const createTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setModal(false);
  };

  const removeTask = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));  
  };

  return (
    <div className='tasks'>
      <Button buttonClass={'tasks__button'} onClick={() => setModal(true)}>Создать новое дело</Button>
      <Modal visible={modal} setVisible={setModal}>
        <TaskForm create={createTask}/>
      </Modal>
      <hr style={{margin: '15px 0'}}></hr>
      <TaskFilter filter={filter} setFilter={setFilter}/>
      <TaskList tasks={sortedAndSearchedTasks} title='Список дел' removeTask={removeTask}/> 
    </div>
  );

}

export default Tasks;