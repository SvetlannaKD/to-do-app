import axios from 'axios'

export default class PostService {
    static async getAll () {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
            console.log(response.data);
            return response.data
        } catch (ev) {
            console.log(ev);
        }
    }
}