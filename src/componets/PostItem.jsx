import Button from './UI/button/Button';

function PostItem ({post, removePost}) {
  
  return (
    <div className='posts__item'>
      <div className='posts__item-content'>
        <h3 className='posts__item-content-title'>{post.id}. {post.title}</h3>
        <p className='posts__item-content-body'>{post.body}</p>
      </div>
      <div className='posts__item-button'>
        <Button onClick={() => removePost(post)}>Удалить</Button>
      </div>
    </div>
  );
  
}

export default PostItem;