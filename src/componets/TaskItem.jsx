import Button from "./UI/button/Button";

function TaskItem ({task, number, removeTask}) {

    console.log(`---render Item ${number}---`); 
    
    return (
        <div className="tasks__item">
            <div className="tasks__item-content">
                <h3 className="tasks__item-content-title">{number}. {task.title}</h3>
                <p className="tasks__item-content-text">{task.text}</p>
            </div>
            <div className="tasks__item-button">
                <Button onClick={() => removeTask(task)}>Удалить</Button>
            </div>
        </div>
    );
}

export default TaskItem;