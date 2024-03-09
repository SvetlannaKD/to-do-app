import Input from "./UI/input/Input";
import Select from "./UI/select/Select";

function PostsFilter ({filter, setFilter}) {

  return (
    <>
      <div className="posts__search">
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
            {value: "body", name: "По описанию"}
        ]}
        selectClass={"select"}
      />
    </>
  );
}

export default PostsFilter;