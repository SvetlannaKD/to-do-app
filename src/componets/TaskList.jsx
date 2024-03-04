import TaskItem from "./TaskItem";

function TaskList ({tasks, title, removeTask}) {
  
  console.log("---render List---"); 

    return (
        <>
        <h1 style={{textAlign: "center"}} className="tasks__title">{title}</h1>
        <div className="tasks__list">
          {tasks.map((task, index) => {
            return (
              <TaskItem task={task} key={task.id} number={index + 1} removeTask={removeTask}/>
            );
          })}
        </div>
        </>
    );
}

export default TaskList;