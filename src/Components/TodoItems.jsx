import './CSS/TodoItems.css';
import tick from './Assets/tick.png';
import cross from './Assets/cross.png';
import not_tick from './Assets/not_tick.png';

const TodoItems = ({ no, display, text, setTodos }) => {

    const deleteTodo = (no) => {
        let data = JSON.parse(localStorage.getItem("todos"));
        data = data.filter((todo) => todo.id !== no); // Filter out the todo item with matching id
        setTodos(data);
        localStorage.setItem("todos", JSON.stringify(data)); // Update localStorage
    }

    const toggle = (no) => {
        let data = JSON.parse(localStorage.getItem("todos"));
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === no) {
                data[i].display = data[i].display === "" ? "line-through" : "";
                break;
            }
        }
        setTodos(data);
        localStorage.setItem("todos", JSON.stringify(data)); // Update localStorage
    }

    return (
        <div className='todoitems'>
            <div className={`todoitems-container ${display}`} onClick={() => toggle(no)}>
                {display === "" ? <img src={not_tick} alt="No tick" /> : <img src={tick} alt="Tick" />}
                <div className="todoitems-text">{text}</div>
            </div>
            <img onClick={() => deleteTodo(no)} className='todoitems-cross-icon' src={cross} alt="Cross" />
        </div>
    );
};

export default TodoItems;