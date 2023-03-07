import { IDatabaseTodo } from './api';

class Http {
  async Get(url: string): Promise<IDatabaseTodo[]> {
    return await this.request('GET', url);
  }

  async Post(url: string, body: string): Promise<IDatabaseTodo> {
    return await this.request('POST', url, body);
  }

  async Put(url: string, body: string): Promise<IDatabaseTodo> {
    return await this.request('PUT', url, body);
  }

  async Delete(url: string): Promise<IDatabaseTodo> {
    return await this.request('DELETE', url);
  }

  private async request(method: string, url: string, body?: string) {
    let config: any = {
      method: method,
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    };
    if (body) config.body = body;

    const response: any = await fetch(url, config)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  }
}
export default new Http();
