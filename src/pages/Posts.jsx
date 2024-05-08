import {useState, useEffect, useRef} from 'react';
import {useList} from '.././hooks/useList';
import {useFetching} from '.././hooks/useFetching';
import {useObserver} from '../hooks/useObserver';
import {getPageCount} from '.././utils/pages';
import PostService from '.././API/PostService';
import PostsList from '.././componets/PostsList';
import PostsFilter from '.././componets/PostsFilter';
import Loader from '.././componets/UI/loader/Loader';
import Pagination from '.././componets/UI/pagination/Pagination';
import Select from '../componets/UI/select/Select';


function Posts () {

  const [posts, setPosts] = useState([]);

  const [filterPosts, setFilterPosts] = useState({sort: '', query: ''});

  const [totalPages, setTotalPages] = useState(0); //сколько всего будет страниц (10 страниц)

  const [limit, setLimit] = useState(10); //сколько постов выводить на странице (10 шт.)

  const [page, setPage] = useState(1); //номер страницы

  const sortedAndSearchedPosts = useList(posts, filterPosts.sort, filterPosts.query);

  const lastElement = useRef();

  //Создание функции загрузки постов по API
  const [fetchPosts, isPostsLoading, postError] = useFetching(async(limit, page) => {
    const response = await PostService.getAll(limit, page);
    setTimeout(()=>console.log("postError:", postError), 10000);
    setPosts([...posts, ...response.data]); //сохраняем посты с сервера для бесконечной ленты
    const totalCount = response.headers['x-total-count'] //получаем общее количество постов на сервере(100 шт.)
    setTotalPages(getPageCount(totalCount, limit));
  });

  //Бесконечная лента загрузки постов
  const [deleteObserver] = useObserver(
    lastElement, page < totalPages, isPostsLoading, (pageLoading) => setPage(pageLoading + 1), page
  );

  //Загрузка постов по API
  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);
  
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));  
  };

  //Изменение номера страницы
  const changePage = (page) => {
    setPage(page);
  }

  //Изменение лимита загрузки постов
  const changeLimit = (value) => {
    setLimit(value);
    setPosts([]);
    setPage(1);
    //Отключаем observer со старым замкнутым номером страницей
    deleteObserver();
  }

  return (
    <div className='posts'>
      <hr style={{margin: '15px 0'}}></hr>
      <PostsFilter filter={filterPosts} setFilter={setFilterPosts}/>
      <Select value={limit} onChange={changeLimit} defaultValue='Кол-во элементов на странице'
        options={[{value: 5, name: '5'}, {value: 10, name: '10'}, {value: 25, name: '25'}, {value: -1, name: 'Показать все'}]}/>
      {postError && <h1>Произошла ошибка: {postError}</h1>}
      <PostsList posts={sortedAndSearchedPosts} title='Список постов' removePost={removePost}/> 
      {isPostsLoading && <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
        <Loader/>
      </div>}
      <div style={{height: 20, background: 'red'}} ref={lastElement}></div>
      <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
    </div>
  );

}

export default Posts;