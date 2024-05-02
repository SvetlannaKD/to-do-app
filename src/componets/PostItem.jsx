import {useNavigate} from 'react-router-dom';
import Button from './UI/button/Button';

function PostItem ({post, removePost}) {

  const router = useNavigate();
  
  return (
    <div className='posts__item'>
      <div className='posts__item-content'>
        <h3 className='posts__item-content-title'>{post.id}. {post.title}</h3>
        <p className='posts__item-content-body'>{post.body}</p>
      </div>
      <div className='posts__item-buttons'>
        <Button buttonClass={'posts__item-buttons_button'} onClick={() => router(`/posts/${post.id}`)}>Открыть</Button>
        <Button buttonClass={'posts__item-buttons_button'} onClick={() => removePost(post)}>Удалить</Button>
      </div>
    </div>
  );
  
}

export default PostItem;