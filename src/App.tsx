import React, { useState } from 'react';
import './App.css';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

function App() {

  // var file = "json/base.json";
  // var myObj;
  // var xmlhttp = new XMLHttpRequest();
  
  // xmlhttp.onreadystatechange = function()
  // {
  //     if (this.readyState == 4 && this.status == 200)
  //     {
  //         myObj = JSON.parse(this.responseText);
  //     }
  // };
  // xmlhttp.open("GET", file, true);
  // xmlhttp.send();

  const [todos, setTodos] = useState<Array<Todo>>([]);

  const toggleComplete: ToggleComplete = selectedTodo => {
    const updatedTodos = todos.map(todo => {
      if (todo === selectedTodo) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const addTodo: AddTodo = newTodo => {
    if (newTodo !== "") {
      setTodos([...todos, { text: newTodo, complete: false, tags: [], id: todos.length + 1 }]);
    }
  };

  const removeTodo: RemoveTodo = todoToRemove => {
    let updatedTodos: Array<Todo> = todos.filter(todo => todo.text != todoToRemove.text);
    setTodos(updatedTodos);
  }

  const editTodo: EditTodo = todoToEdit => {
    let todoToUpdateIndex: number = todos.findIndex(todo => todo.text == todoToEdit.text);
    console.log(todoToUpdateIndex);
  }

  const addTag = (todoId, tagId) => {
    const tag = { title: 'qwe' };
    console.log(tag);
    setTodos(((prevState) => (todos.map((item) => {
      if (item.id === todoId) {
        return { ...item, tags: [...item.tags, tag] }
      }
      return item;
    }) )));
  }

  console.log(todos);

  const tags = [
    {
      title: 'пошли',
    },
    {
      title: 'нахуй',
    },
    {
      title: 'с таким тз',
    }
  ];
  
  return (
    <div className="todo-app">
      <header>
        <h1>
        Todo App
        </h1>
      </header>
      <TodoForm addTodo={addTodo}/>
      <div className='tags-section'>
      {tags.map(({ title }) => (
          <div className='tags-item'>
            {title}
          </div>
      ))}
      </div>
      <TodoList todos={todos} toggleComplete={toggleComplete} onRemoveTodo={removeTodo} editTodo={editTodo} addTag={addTag}/>
    </div>
  );
};

export default App;
