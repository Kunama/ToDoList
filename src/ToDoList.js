import React, { Component } from "react";
import "./main.css";
class TaskDisplay extends Component {
  constructor(props){
    super(props);
    this.displayTasks = this.displayTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }
  toggleCompletion(e, key){
    e.preventDefault();
    this.props.completion(key);
  }
  deleteTask(e, key){
    e.preventDefault();
    this.props.delete(key);
  }

  displayTasks(task) {
    
    if(task.completed === true){
      var style={ color: '#8CC739' }
    } else{
      style={ color: '' }
    }
    return <div key ={task.key}><li style = {style} key={task.key} onClick={(e) => this.toggleCompletion(e, task.key)}>{task.value}</li><button onClick = {(e) => this.deleteTask(e, task.key)}>Delete</button></div>;
  }

  render() {
    var taskList = this.props.tasks.map(this.displayTasks);
    return <ol>{taskList}</ol>;
  }
}

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
    this.state = {
      tasks: [],
      taskCounter: 0
    };
  }

  //Create Task Function
  createTask(e) {
    e.preventDefault(); //Prevent page reload on form submit

    var task = {
      value: document.getElementById("taskInput").value,
      key: this.state.taskCounter,
      completed: false
    };

    document.getElementById("taskInput").value = ""; //Clear form input

    if (task.value === "") {
      alert("Please enter a task before submitting.");
    } else {
      var updatedTasks = this.state.tasks;
      updatedTasks.push(task);
      var updatedTaskCounter = this.state.taskCounter + 1; //Update state with new task and counter

      this.setState({
        tasks: updatedTasks,
        taskCounter: updatedTaskCounter
      });

      // console.log(this.state.tasks);
    }
  }
  toggleCompletion(key){
    
    var updatedTaskList = this.state.tasks;
    for(var i=0; i<updatedTaskList.length; i++){
      if(updatedTaskList[i].key === key){
        updatedTaskList[i].completed = !updatedTaskList[i].completed;
      }
    }
    this.setState({
      tasks: updatedTaskList
    });
  }
  deleteTask(key){
    var updatedTaskList = this.state.tasks;
    for(var i=0; i<updatedTaskList.length; i++){
      if(updatedTaskList[i].key===key){
        updatedTaskList.splice(i,1);
      }
    } 

    
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
