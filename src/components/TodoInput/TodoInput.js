import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_TODO, GET_TODOS } from "../../graphql/queries";

const updateCache = (cache, { data }) => {
  const oldTodo = cache.readQuery({
    query: GET_TODOS,
  });

  const newTodo = data.insert_one_todo;
  cache.writeQuery({
    query: GET_TODOS,
    data: { todos: [...oldTodo.todos, newTodo] },
  });
};

const TodoInput = () => {
  const [task, setTask] = useState("");
  const [addTodo] = useMutation(ADD_TODO, { update: updateCache });

  const handleAdd = () => {
    addTodo({ variables: { task } });
    setTask("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add new todo task"
        className="todo-input"
        value={task}
        onChange={(e) => setTask(e.target.vale)}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleAdd();
        }}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default TodoInput;
