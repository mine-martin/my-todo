import { useMutation } from '@apollo/client'
import React, { useState } from 'react'

const updateCache = (cache, { data }) =>{
  const oldTodo = cache.readQuery({
    query: GET_TODOS,
  })

  const newTodo = data.insert_one_todo
  cache.writeQuery({
    query : GET_TODOS,
    data: { todos: [ ...oldTodo.todos, newTodo ] }
  })

} 

  export default  () =>{
    const [task, setTask] = useState('')
    const [addTodo] = useMutation(ADD_TODO, {update: updateCache})

    const handleAdd = () =>{
      addTodo({variables: { task }})
      setTask('')
    }
  
  return (
    <div>
      <input 
      type="text" placeholder="Add new todo task"
      className='todo-input'
      value={task}
      onChange={ e => setTask(e.target.vale)}
      onKeyPress= {e => {
        if (e.key === "Enter") submitTask
      }}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}
