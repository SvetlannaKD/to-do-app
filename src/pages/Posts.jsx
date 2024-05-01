import {useState, useEffect} from 'react';
import {useList} from '.././hooks/useList';
import {useFetching} from '.././hooks/useFetching';
import {getPageCount} from '.././utils/pages';
import PostService from '.././API/PostService';
import PostsList from '.././componets/PostsList';
import PostsFilter from '.././componets/PostsFilter';
import Loader from '.././componets/UI/loader/Loader';
import Pagination from '.././componets/UI/pagination/Pagination';

function Posts () {

  const [posts, setPosts] = useState([]);

  const [filterPosts, setFilterPosts] = useState({sort: '', query: ''});

  const [totalPages, setTotalPages] = useState(0); //сколько будет страниц (10 страниц)

  const [limit, setLimit] = useState(10); //сколько постов выводить на странице (10 шт.)

  const [page, setPage] = useState(1); //номер страницы

  const sortedAndSearchedPosts = useList(posts, filterPosts.sort, filterPosts.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async(limit, page) => {
    const response = await PostService.getAll(limit, page);
    setTimeout(()=>console.log("postError:", postError), 10000);
    setPosts(response.data);//получаем ответ от сервера
    const totalCount = response.headers['x-total-count'] //получаем общее количество постов на сервере(100 шт.)
    setTotalPages(getPageCount(totalCount, limit));
  });

  //Загрузка постов по API
  useEffect(() => {
    fetchPosts(limit, page);
  }, []);
  
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));  
  };

  //Изменение номера страницы
  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
  }

  return (
    <div className='posts'>
      <hr style={{margin: '15px 0'}}></hr>
      <PostsFilter filter={filterPosts} setFilter={setFilterPosts}/>
      {postError && <h1>Произошла ошибка: {postError}</h1>}
      {isPostsLoading 
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
            <Loader />
          </div>
        : <PostsList posts={sortedAndSearchedPosts} title='Список постов' removePost={removePost}/> 
      }
      <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
    </div>
  );

}

export default Posts;