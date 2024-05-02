import axios from 'axios'

export default class PostService {

  /**
   * Загрузка постов по API с сервера
   * @param limit {Number} Количество постов для вывода на 1 странице (по умолч. 10 шт.)
   * @param page {Number} Номер текущей страницы (по умолч. 1 стр.)
   */
  static async getAll (limit = 10, page = 1) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      //Параметры запроса
      params: {
        _limit: limit,
        _page: page
      }
    });
    return response;
  }

  /**
   * Загрузка 1 поста по API с сервера
   * @param id {Number} 
   */
  static async getById (id) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id);
    return response;
  }

}