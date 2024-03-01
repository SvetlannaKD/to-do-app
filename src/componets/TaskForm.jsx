import { useState } from 'react';
import {nanoid} from 'nanoid';
import Button from './UI/button/Button';
import Input from './UI/input/Input';

function TaskForm ({create}) {

    const [valueTask, setValueTask] = useState({title: "", text: ""});

    const addNewTask = (ev) => {
        ev.preventDefault();
        const newTask = {...valueTask, id: nanoid(10)}
        create(newTask);
        setValueTask({title: "", text: ""});
    };

    return (
        <form className="form">
            <Input 
                type="text" 
                placeholder="Название" 
                value={valueTask.title} 
                onChange={(ev) => setValueTask({...valueTask, title: ev.target.value})}
            />
            <Input 
                type="text" 
                placeholder="Описание" 
                value={valueTask.text} 
                onChange={(ev) => setValueTask({...valueTask, text: ev.target.value})}
            />
            <Button buttonClass={"form__button"} onClick={addNewTask}>Добавить дело</Button>
        </form>
    );
};

export default TaskForm;