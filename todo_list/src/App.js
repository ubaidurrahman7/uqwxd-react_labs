import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    
    if (newTodo.text.length > 0) {
      setTodos([...todos, newTodo]);
      setTodo("");
    } else {
      alert("Enter Valid Task");
      setTodo("");
    }
  }

  const deleteTodo = (id) => {
    let updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  const toggleComplete = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    if (json) {
      const loadedTodos = JSON.parse(json);
      setTodos(loadedTodos);
    }
  }, []);
  

  React.useEffect(() => {
    if (todos.length > 0) {
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);
  

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', width: '100vw', height: '100vh' }}>
      <div className="app" style={{ maxWidth: '400px', border: '1px solid black', backgroundColor: 'lightgray', padding: '20px' }}>
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Add a new task"
            value={todo}
          />
          <button type="submit">Add Todo</button>
        </form>
        {todos.map((todoItem) => (
          <div className="todo" key={todoItem.id}>
            {todoItem.id === todoEditing ? (
              <input type="text" onChange={(e) => setEditingText(e.target.value)} />
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div className={todoItem.completed ? 'completed' : ''}>
                  {todoItem.text}
                </div>
                <input type="checkbox" id="completed" checked={todoItem.completed} onChange={() => toggleComplete(todoItem.id)} />
              </div>
            )}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              {todoItem.id === todoEditing ? (
                <button onClick={() => submitEdits(todoItem.id)}>Submit Edits</button>
              ) : (
                <button onClick={() => setTodoEditing(todoItem.id)}>Edit</button>
              )}
              <button onClick={() => deleteTodo(todoItem.id)} style={{ width: '100px' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
