import {getPagesArray} from '../../../utils/pages';
import Button from '../button/Button';

function Pagination ({totalPages, page, changePage}) {

  //Создаем массив с номерами страниц
  const pagesArray = getPagesArray(totalPages);

  return (
    <div className='page__wrapper'>
      {pagesArray.map((p) => {
        return (
          <Button 
            buttonClass={page === p ? 'page__button active' : 'page__button'} 
            key={p}
            onClick={() => changePage(p)}
          > 
            {p}
          </Button>
        );
      })}
    </div>
  );
  
}

export default Pagination;