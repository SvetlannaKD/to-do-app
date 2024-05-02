import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useFetching} from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../componets/UI/loader/Loader';

function PostIdPage () {

  const params = useParams();

  const [post, setPost] = useState({});

  const [comments, setComments] = useState([]);

  //Создание функции загрузки 1 поста по API
  const [fetchPostById, isLoading, error] = useFetching(async(id) => {
    const response = await PostService.getById(id);
    setPost(response.data); //сохраняем пост с сервера
  });

  //Создание функции загрузки комментариев к посту по API
  const [fetchComments, isCommentsLoading, commentsError] = useFetching(async(id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data); //сохраняем комментарии с сервера
  });

  //Загрузка 1 поста по API
  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h1>Вы открыли страницу поста c ID = {params.id}</h1>
      {isLoading
        ? <Loader/>
        : <div style={{margin: '30px 0'}}>{post.id}. {post.title}</div>}
      <h2>Комментарии</h2>
      {isCommentsLoading
        ? <Loader/>
        : <div>{comments.map((comment) => 
            <div key={comment.id} style={{marginTop: 15}}>
              <h5>{comment.email}</h5>
              <div>{comment.body}</div>
            </div>
        )}</div>}
    </div>
  );
}

export default PostIdPage;