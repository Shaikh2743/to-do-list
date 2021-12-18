import React, { useState, useEffect } from 'react';
import setLigtImage from "../images/icon-sun.svg";
import setDarkImage from "../images/icon-moon.svg";
import  "../style/to_do_list_dark.css";

export default function Header() {


  const [data, setDataItem] = useState([]);
  console.log(data);
  const [value, setValue] = useState();

  var cboxs = document.getElementsByClassName("task-list-item-checkbox");
  for (var i = 0; i < cboxs.length; i++) {

    if (cboxs[i].checked) {
      cboxs[i].closest(".task-list-item").style.textDecoration = "line-through";
    }
    else {
      cboxs[i].closest(".task-list-item").style.textDecoration = "";
    }
  }





  const setData = (event) => {

    setValue(event.target.value);
  }

  const add = (e) => {
    e.preventDefault();
    setDataItem([...data, { text: value, completed: false, id: new Date().getTime() }]);

    setValue("");

  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('key'));
    if (todos) {
      setDataItem(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("key", JSON.stringify(data));

  }, [data]);
  const toggleId = (id) => {
    const newid = data.map(data =>
      data.id === id ? { ...data, completed: !data.completed } : data
    );
    setDataItem(newid);
  }
//   function toggleTheme() {
//     if (theme.getAttribute('import') === 'to_do_list_light.css') {
//         theme.setAttribute('import', 'to_do_list_dark.css');
//     } else {
//         theme.setAttribute('import', 'to_do_list_light.css');
//     }
// }

  return (
    <div className='Theme'>
      <div className="to_do">
        <div className="title">
          <span>todo</span>
          <span className="sun"  onClick="toggleTheme()"  ><a href="#"><img src={setLigtImage} alt="" /></a></span>
          <span className="moon" onClick="toggleTheme()"  ><a href="#"><img src={setDarkImage} alt="" /></a></span>
        </div>
        <div className="input_field">
          <form onSubmit={add}>
            <input type="text" placeholder='Add New To-do' onChange={setData} /></form>

        </div>
      </div>
      <div className="results">
        <ul className="tags">{
          data.map((val, i) => {
            return (<li class="task-list-item" key={i}><input className="checkbox task-list-item-checkbox" type="checkbox" checked={val.completed} onClick={() => toggleId(val.id)} />{val.text}</li>)
          })
        }
        </ul>
        <div className="btns">
          <button a href="#" onClick="btnall">All</button>
          <button a href="#" onClick="btnactive">Active</button>
          <button a href="#" onClick="btncompleted" >Completed</button>
          <button a href="#" onClick="btnclear">Clear Completed</button>
        </div>
      </div>
    </div>
  )

}