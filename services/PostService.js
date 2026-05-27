export class PostService {
  constructor(request) {
    this.request = request;
  }

  async getAllPosts() {
    return await this.request.get('/posts');
  }

  async getPostsByUserId(userId) {
    return await this.request.get(`/posts?userId=${userId}`);
  }

  async createPost(title, body, userId = 1) {
    return await this.request.post('/posts', {
      data: { title, body, userId }
    });
  }

  async updatePost(id, updates = {}) {
    return await this.request.put(`/posts/${id}`, {
      data: updates
    });
  }

  async deletePost(id) {
    return await this.request.delete(`/posts/${id}`);
  }

  async getPostById(id) {
    return await this.request.get(`/posts/${id}`);
  }
}