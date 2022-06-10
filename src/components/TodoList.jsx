import React, { useState, useEffect} from 'react'
import { collection, query, onSnapshot, updateDoc,doc, deleteDoc} from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
const TodoList = () => {
    const [todos, SetTodos ] = useState([]);
    useEffect(() => {
        const q = query(collection(db, "todos"));
        const unsub = onSnapshot(q, querySnapshot => {
            let todosArray = [];
            querySnapshot.forEach(doc => {
                todosArray.push({...doc.data(), id: doc.id})
            });

            SetTodos(todosArray)
        });

        return () => unsub();
    },[]);

    const completed = async (todo) => {
        await updateDoc(doc(db, "todos", todo.id), {
            completed: !todo.completed
        })
    };

    const deleteTodo = async (todo) => {
        await deleteDoc(doc(db, "todos", todo.id))
    }
  return (
    <div>
        {todos?.map((todo) => {
            return (
                <div key={todo.id} className='flexLayout bg-gray-100 px-2 my-2 rounded-md py-2'>
                    <div className='flexLayout'>
                    <input type="checkbox" className='mr-2' checked={todo.completed} onChange={() => completed(todo)}/>
                    <h3 className={todo.completed ? "line-through font-bold" : "font-bold"}>{todo.todo}</h3>
                    </div>
                    <span><i class='bx bxs-trash-alt text-lg text-red-500' onClick={() => deleteTodo(todo)}></i></span>
                </div>
            )
        })}
    </div>
  )
}

export default TodoList