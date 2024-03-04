import Input from "./UI/input/Input";
import Select from "./UI/select/Select";

function TaskFilter ({filter, setFilter}) {

  return (
    <>
      <div className="tasks__search">
      <Input 
        type="text" 
        placeholder="Поиск..." 
        value={filter.query} 
        onChange={(ev) => setFilter({...filter, query: ev.target.value})}
      />
      </div>
      <Select 
        value={filter.sort}
        onChange={(selectedSort) => setFilter({...filter, sort: selectedSort})}
        defaultValue="Сортировка" 
        options={[
            {value: "title", name: "По названию"},
            {value: "text", name: "По описанию"}
        ]}
        selectClass={"select"}
      />
    </>
  );
}

export default TaskFilter;