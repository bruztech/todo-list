import { useState, useRef, useEffect } from 'react';
import '../CSS/Todo.css';
import TodoItems from '../TodoItems';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);

    const add = () => {
        const newCount = parseInt(localStorage.getItem("todos_count") || "0") + 1; // Calculate new count
        const newTodo = { id: newCount, text: inputRef.current.value, display: "" };
        setTodos([...todos, newTodo]);
        inputRef.current.value = "";
        localStorage.setItem("todos", JSON.stringify([...todos, newTodo])); // Update todos in localStorage
        localStorage.setItem("todos_count", newCount); // Store updated count
    }

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        const storedCount = localStorage.getItem("todos_count") || "0";
        setTodos(storedTodos);
        localStorage.setItem("todos_count", storedCount); // Ensure count is set
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <div className='todo'>
            <div className="todo-header">
                To-Do List
            </div>
            <div className="todo-add">
                <input ref={inputRef} type="text" placeholder='Add your task' className='todo-input' />
                <div onClick={add} className="todo-add-btn">ADD</div>
            </div>
            <div className="todo-list">
                {todos.map((item, index) => (
                    <TodoItems key={index} setTodos={setTodos} no={item.id} display={item.display} text={item.text} />
                ))}
            </div>
        </div>
    );
};

export default Todo;
