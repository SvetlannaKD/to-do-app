import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useFetching} from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../componets/UI/loader/Loader';

function PostIdPage () {

  const [post, setPost] = useState({});

  const params = useParams();

  //Создание функции загрузки 1 поста по API
  const [fetchPostById, isLoading, error] = useFetching(async(id) => {
    const response = await PostService.getById(id);
    setPost(response.data); //сохраняем пост с сервера
  });

  //Загрузка 1 поста по API
  useEffect(() => {
    fetchPostById(params.id);
  }, []);

  return (
    <div>
      <h1>Вы открыли страницу поста c ID = {params.id}</h1>
      {isLoading
        ? <Loader/>
        : <div style={{margin: '30px 0'}}>{post.id}. {post.title}</div>}
    </div>
  );
}

export default PostIdPage;