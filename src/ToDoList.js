import React, { Component } from "react";

class TaskDisplay extends Component {
  displayTasks(task) {
    return <li key={task.key}>{task.value}</li>;
  }
  render() {
    var taskList = this.props.tasks.map(this.displayTasks);
    return <ul>{taskList}</ul>;
  }
}

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.createTask = this.createTask.bind(this);

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
      key: this.state.taskCounter
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

      console.log(this.state.tasks);
    }
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Task: <input type="text" name="task" id="taskInput" />
          </label>
          <button type="submit" onClick={this.createTask}>
            Add Task
          </button>
          <TaskDisplay tasks={this.state.tasks} />
        </form>
      </div>
    );
  }
}

export default ToDoList;
