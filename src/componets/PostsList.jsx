import PostItem from './PostItem';

function PostsList ({posts, title, removePost}) {

  if (typeof posts !== 'undefined') {

    if (!posts.length) {
      return (
        <h1 style={{textAlign: 'center'}} className='posts__title'>
          Список постов пуст!
        </h1>
      );
    }

    return (
      <>
        <h1 style={{textAlign: 'center'}} className='posts__title'>{title}</h1>
        <div className='posts__list'>
          {posts.map((post) => {
            return (
              <PostItem post={post} key={post.id} removePost={removePost}/>
            );
          })}
        </div>
      </>
    );
  }
  
}

export default PostsList;