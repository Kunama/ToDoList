import React, { Component } from "react";
import "./main.css";

class TaskDisplay extends Component {

  constructor(props){ //Constructor for TaskDisplay functions
    super(props);
    this.displayTasks = this.displayTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  toggleCompletion(e, key){//Helper function for toggleCompletion in ToDoList
    e.preventDefault();
    this.props.completion(key);
  }

  deleteTask(e, key){//Helper function for deleteTask in ToDoList class
    e.preventDefault();
    this.props.delete(key);
  }

  displayTasks(task, key) {//Formats all tasks in props into returnable HTML
    if(task.completed === true){
      var style={ color: '#8CC739' }
    } else{
      style={ color: '' }
    }

    return <div key ={key}><li style = {style} key={key} onClick={(e) => this.toggleCompletion(e, key)}>{task.value}</li><button onClick = {(e) => this.deleteTask(e, key)}>Delete</button></div>;
  }

  render() {
    var taskList = this.props.tasks.map(this.displayTasks);
    return <ol>{taskList}</ol>; //Displays generated to do list items
  }
}

class ToDoList extends Component {
  constructor(props) { //Constructor for ToDoList functions
    super(props);
    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
    this.state = {
      tasks: []
    };
  }

  createTask(e) {//Adds new task into state array
    e.preventDefault(); 

    var task = { //Create new task element
      value: document.getElementById("taskInput").value,
      completed: false
    };

    document.getElementById("taskInput").value = ""; //Clear form input
    task.value = task.value.trim();
    if (task.value === "") {
      alert("Please enter a task before submitting.");
    } else {
      var updatedTasks = this.state.tasks;
      updatedTasks.push(task);

      this.setState({
        tasks: updatedTasks,
      });
    }
  }

  toggleCompletion(i){ //Toggles state completed for task corresponding to passed in key
    var updatedTaskList = this.state.tasks;
        updatedTaskList[i].completed = !updatedTaskList[i].completed;
    this.setState({
      tasks: updatedTaskList
    });
  }

  deleteTask(i){ //Deletes task from state array
    var updatedTaskList = this.state.tasks;
        updatedTaskList.splice(i,1);
    this.setState({
      tasks: updatedTaskList
    });
  }

  render() {
    return (
      <div>
        <form id="taskForm">
          <label>
            Task: </label><input type="text" name="task" id="taskInput" />
          
          <button type="submit" onClick={this.createTask}>
            Add Task
          </button>
        </form>
        <TaskDisplay tasks={this.state.tasks} delete = {this.deleteTask} completion = {this.toggleCompletion}/>
      </div>
    );
  }
}

export default ToDoList;
