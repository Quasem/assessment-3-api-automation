export class PostService {
  /**
   * We pass Playwright's 'request' object into this constructor
   * so this class has the power to make HTTP calls.
   */
  constructor(request) {
    this.request = request;
  }

  // 1. GET - Retrieve data
  async getAllPosts() {
    // Note: Playwright automatically uses the baseURL from your config!
    return await this.request.get('/posts');
  }

  // 2. POST - Create new data
  async createPost(title, body, userId = 1) {
    return await this.request.post('/posts', {
      data: {
        title: title,
        body: body,
        userId: userId
      }
    });
  }

  // 3. PUT - Update existing data
  async updatePost(id, title) {
    return await this.request.put(`/posts/${id}`, {
      data: {
        id: id,
        title: title,
        body: 'This body was also updated',
        userId: 1
      }
    });
  }

  // 4. DELETE - Remove data
  async deletePost(id) {
    return await this.request.delete(`/posts/${id}`);
  }

  // 5. EXCEPTION HANDLING - Purposely ask for a post that doesn't exist
  async getNonExistentPost() {
    return await this.request.get('/posts/99999');
  }
}