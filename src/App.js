import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [listTodo, setListTodo] = useState([]);
  const [inputValue, setinputValue] = useState('');

  const handleInputValue = (e) => {    
    setinputValue(e.target.value);
  }

  const addTodo = () => {
    const getTodoList = JSON.stringify([...listTodo, inputValue]);
    localStorage.setItem("todoList", getTodoList);
    setListTodo([...listTodo, inputValue]);
    setinputValue('');
  }

  const deleteTodo = (index) => {
    const deleteAfterTodo = listTodo.filter((curval, id) => {return id!==index});
    const getTodoList = JSON.stringify(deleteAfterTodo);
    localStorage.setItem("todoList", getTodoList);
    setListTodo(deleteAfterTodo);
  }

  const removeAllTodo = () => {
    setListTodo([]);
    localStorage.setItem("todoList", []);
  }
  
  useEffect(()=> {
    const getLocalTodo = localStorage.getItem("todoList");
    if(getLocalTodo) {
      setListTodo(JSON.parse(getLocalTodo));
    }    
  }, []);

  return (
    <div className="container">
      <div className='todoBox'>
        <div className='title'>
          <h1>TO DO LIST</h1>
        </div>
        <div className='todoList'>
          <div className='listDiv'>
            <ul className='list'>
              {
                listTodo.map((curEle, index) => {
                  return (
                    <li key={index}>{curEle}<div className='icon' onClick={()=>deleteTodo(index)}><img src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/trash-256.png" alt="icon"/></div></li> 
                  )
                })
              }                           
            </ul>
          </div>
          <div>
            <div className='col'>
              <input type='text' id='addInput' onChange={handleInputValue} value={inputValue} placeholder='Type Todo name'/>
            </div>

            <div className='col'>
              <button type='button' id='addBtn' onClick={addTodo} className='btn-primary'>Add Todo</button>
            </div>

            <div className='col'>
              <button type='button' id='removeBtn' onClick={removeAllTodo} className='btn-primary'>Remove all Todo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;