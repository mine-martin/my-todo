import { useMutation } from '@apollo/client';
import React from 'react';
import { DELETE_TODO, GET_TODOS, UPDATE_TODO } from '../../graphql/queries';
import './Task.css';

const Tasks = (todo) => {
  const [removeTodoMutation] = useMutation(DELETE_TODO);
  const [updateTodoMutation] = useMutation(UPDATE_TODO);

  const handleRemove = (id) => {
    removeTodoMutation({
      variables: { id },
      optimisticResponse: true,
      update: (cache) => {
        const oldTodo = cache.readQuery({ query: GET_TODOS });
        const todos = oldTodo.todos.filter((i) => i.id !== id);
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos },
        });
      },
    });
  };

  const updateTodo = ({ id, completed }) => {
    updateTodoMutation({
      variables: { id, completed: !completed },
      optimisticResponse: true,
      update: (cache) => {
        const oldTodo = cache.readQuery({ query: GET_TODOS });
        const updatedTodo = oldTodo.to.map((todo) => {
          if (todo.id === id) {
            return { ...todo, completed: !completed };
          } else {
            return todo;
          }
        });
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: updatedTodo },
        });
      },
    });
  };

  return (
    <div key={todo.id} className='task'>
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={() => updateTodo(todo)}
      />

      <span className={todo.updated ? 'updated' : ''}>{todo.task}</span>
      <button type='submit' onClick={() => handleRemove(todo.id)}>
        Remove
      </button>
    </div>
  );
};

export default Tasks;
