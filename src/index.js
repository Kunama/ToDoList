import React from "react";
import ReactDOM from "react-dom";
import ToDoList from "./ToDoList";
import * as serviceWorker from './serviceWorker';
ReactDOM.render( < ToDoList / > , document.getElementById("root"));
serviceWorker.unregister();