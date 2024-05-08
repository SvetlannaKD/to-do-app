import {useEffect, useRef} from 'react';

/**
 * Хук для бесконечной ленты загрузки, возвращает функцию для отключения observer
 * @param ref {React.MutableRefObject<HTMLElement>} Элемент, за котромым необходимо наблюдать
 * @param canLoad {Boolean} Условие, которое ограничивает вызов функции на загрузку (например если страница максимальная, то больше номер страницы не увеличиваем)
 * @param isLoading {Boolean} Индикатор загрузки по API
 * @param callback {Function} Выполняется в том случае, когда элемент(ref) попадает в зону видимости на странице (например увеличиваем номер страницы +1)
 * @param page {Number} Текущий номер страницы
 * @return {[Function]} Функция для отключения observer
 */

export function useObserver (ref, canLoad, isLoading, callback, page) {

  const observer = useRef();

  useEffect(() => {
    //Если идет загрузка, блокируем создание нового observer
    if (isLoading) {
      return;
    }
    //Если observer уже создан(в поле current что-то находится), отключаем observer(который наблюдает за всеми элементами)
    if (observer.current) {
      observer.current.disconnect();
    }
    //Функция, выполняется в том случае, когда элемент(ref) попадает или исчезает из зоны видимости на странице
    const cb = function (enteries, observer) { //enteries - массив элементов, за которыми мы наблюдаем
      if (enteries[0].isIntersecting && canLoad) { //isIntersecting - проверяет только находится ли элемент(ref) в зоне видимости или нет
        //console.log('див в зоне видимости');
        //Когда прокручиваем список постов до конца страницы(элемент(ref) попадает в зону видимости), вызываем функцию(например изменяем номер страницы (+1))
        callback(page);
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(ref.current); //Указываем за каким элементом мы будем наблюдать

  }, [isLoading]);

  //Функция для отключения observer
  const deleteObserver = [() => observer.current?.disconnect()];

  return deleteObserver;

}