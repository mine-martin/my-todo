import { useMutation } from '@apollo/client'
import React from 'react'
import { DELETE_TODO, GET_TODOS, UPDATE_TODO } from '../../graphql/queries'

const Tasks = () => {

  const[removeTodoMutation] =useMutation(DELETE_TODO)

  const updateTodo = ({id, completed}) => {}

  const removeTodo =(id) =>{
    removeTodoMutation({ variables: { id }, optimisticResponse: true, 
    update: (cache) =>{
      const oldTodo = cache.readQuery({ query: GET_TODOS })
      const todos = oldTodo.todos.filter((i)  =>i.id !== id )
      cache.writeQuery({
        query: GET_TODOS,
        data: { todos }
      })
    }
    })
  }



  return (
    <div>
        
        <input  type='checkbox' checked= { todo.completed }
        onChange={() => updateTodo(todo)}
        />

        <span className={todo.updated? 'updated' : "" }>{todo.task}</span>
        <button type='submit' onClick={() => handleRemove(todo.id)}></button>
    </div>
  )
}

export default Tasks