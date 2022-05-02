import { gql } from "@apollo/client";


export const GET_TODOS = gql `
    query GetTodos{
    todos {
        id
        task
        completed
    }
}
`

export const ADD_TODO = gql `
    mutation($task: String!) {
        insert_one_todo(object: { task: $task }) {
            id
            task
            completed
        }
    }
`

export const UPDATE_TODO = gql `
    mutation($id: Int! $completed: Boolean) {
        update_one_todo(
            columns: { id: $id}
            _set: { completed: $completed }
        ){
            id
        }
    }
`

export const DELETE_TODO = gql `
    mutation($id: Int!) {
        delete_one_todo(id: $id) {
            id
        }
    }

`