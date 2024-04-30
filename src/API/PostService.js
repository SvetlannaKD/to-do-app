import axios from 'axios'

/**
 * @param limit {Number} Количество постов для вывода на 1 странице (по умолч. 10 шт.)
 * @param page {Number} Номер текущей страницы (по умолч. 1 стр.)
 */

export default class PostService {
  static async getAll (limit = 10, page = 1) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _limit: limit,
        _page: page
      }
    });
    return response;
  }
}