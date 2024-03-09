import axios from 'axios'

export default class PostService {
    static async getAll () {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
            console.log("response.data:", response.data);
            return response.data
    }
}