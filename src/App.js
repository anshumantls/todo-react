import React from 'react';
import './App.css';

class App extends React.Component  {
  state = {
    newTask: '',
    remainingTasks : []
  }

  _addNewTask = () => {
    if (this.state.newTask !== '') {
      const newTask = {
        taskName : this.state.newTask,
        id : new Date()
      }
      const newRemaining = [...this.state.remainingTasks];
      newRemaining.push(newTask);
      this.setState({newTask:'',remainingTasks:newRemaining}, () => {
        console.log(this.state.remainingTasks);
      });
    }
  }

  _deleteTask = (index) => {
    const newRemaining = [...this.state.remainingTasks];
    newRemaining.splice(index,1);
    this.setState({remainingTasks:newRemaining}, () => {
      console.log(this.state.remainingTasks);
    });
  }

  _markAsDoneUnDone = (index) => {

  }

  render() {
    
    const tasks = this.state.remainingTasks.map((task,index) => {
      return <li key={task.id}>{task.taskName}<button onClick={() => this._deleteTask(index)}>Delete</button></li>;
    })

    return (
      <div className="App">
        <h1>todos</h1>
        <input placeholder="Enter a new task"
          value={this.state.newTask} 
          onChange={(event) => {this.setState({newTask : event.target.value})}}/>
        <button onClick={this._addNewTask}>Add Task</button>
        <div>
          <ul>
            {tasks}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
