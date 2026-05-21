import { expect } from '@playwright/test';

export class PostService {
  constructor(request) {
    this.request = request;
  }

  // NEW: A high-level validation helper. If a happy-path fails, we catch it here instantly!
  async validateSuccess(response) {
    expect(response.status(), `Fail Fast: Expected success but got ${response.status()}`).toBeLessThan(400);
    expect(response.headers()['content-type']).toContain('application/json');
  }

  async getAllPosts() {
    const response = await this.request.get('/posts');
    await this.validateSuccess(response);
    return response;
  }

  // Added for the "Filtered Data" requirement
  async getPostsByUserId(userId) {
    const response = await this.request.get(`/posts?userId=${userId}`);
    await this.validateSuccess(response);
    return response;
  }
ß
  async createPost(title, body, userId = 1) {
    const response = await this.request.post('/posts', {
      data: { title, body, userId }
    });
    await this.validateSuccess(response);
    return response;
  }

  async updatePost(id, updates = {}) {
    // FIX: Using an updates object. We only update exactly what the user passes in!
    const response = await this.request.put(`/posts/${id}`, {
      data: updates
    });
    await this.validateSuccess(response);
    return response;
  }

  async deletePost(id) {
    const response = await this.request.delete(`/posts/${id}`);
    await this.validateSuccess(response);
    return response;
  }

  // Note: We do NOT use validateSuccess() here because we are intentionally testing a 404 Not Found
  async getPostById(id) {
    return await this.request.get(`/posts/${id}`);
  }
}