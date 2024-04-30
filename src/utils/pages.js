/**
 * Считаем количество страниц всего
 * @param totalCount {Number} Общее количество постов
 * @param limit {Number} Количество постов для вывода на 1 странице
 * @returns {Number}
 */
export const getPageCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit); //105(всего постов) делим на 10(постов на 1 странице) = получаем 10,5 страниц - округляем до 11
}

/**
 * Заполняем массив номерами страниц
 * @param totalPages {Number} Количество страниц
 * @returns {Array}
 */
export const getPagesArray = (totalPages) => {
  let result = [];
  for (let i = 0; i < totalPages; i++) {
      result.push(i + 1);
  }
  return result;
}