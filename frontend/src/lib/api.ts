import { getId } from '../components/TodoCreate/TodoCreate';
import { Todo } from '../components/TodoState/TodoState';
import Http from './Http';

const BASE_URL = 'http://localhost:8000/api/todos';

export interface IDatabaseTodo {
  id?: number;
  text: string;
  isComplete: number;
}

class Api {
  async getTodos(): Promise<Todo[]> {
    let dbTodos: IDatabaseTodo[] = await Http.Get(BASE_URL);
    let todos: Todo[] = [];

    for (let i: number = 0; i < dbTodos.length; i++) {
      todos.push(this.toTodo(dbTodos[i]));
    }
    return todos;
  }

  async createTodo(todo: Todo): Promise<Todo> {
    let dbTodo: IDatabaseTodo = this.toIDatabaseTodo(todo);
    dbTodo = await Http.Post(BASE_URL, JSON.stringify(dbTodo));
    return this.toTodo(dbTodo);
  }

  async updateTodo(
    id: number,
    text?: string,
    isComplete?: Boolean
  ): Promise<Todo> {
    let updatedFields: any;
    
    if (text != null) {
      updatedFields = { ...updatedFields, Text: text };
    }

    if (isComplete != null) {
      updatedFields = {
        ...updatedFields,
        IsComplete: isComplete == false ? 0 : 1,
      };
    }
    
    let dbTodo: IDatabaseTodo = await Http.Put(
      `${BASE_URL}/${id}`,
      JSON.stringify(updatedFields)
    );
    return this.toTodo(dbTodo);
  }

  async deleteTodo(todo: Todo): Promise<Todo> {
    let dbTodo: IDatabaseTodo = await Http.Delete(
      `${BASE_URL}/${todo.id}`
    );
    return this.toTodo(dbTodo);
  }

  private toTodo(dbTodo: IDatabaseTodo): Todo {
    var todo: Todo = {
      _id: getId(),
      text: dbTodo.text,
      isComplete: dbTodo.isComplete == 0 ? false : true,
      id: dbTodo.id,
      animate: false,
    };
    return todo;
  }

  private toIDatabaseTodo(todo: Todo): IDatabaseTodo {
    var dbTodo: IDatabaseTodo = {
      text: todo.text,
      isComplete: todo.isComplete == false ? 0 : 1,
    };
    return dbTodo;
  }
}
export default new Api();
