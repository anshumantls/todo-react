import React from 'react';
import './App.css';

class App extends React.Component  {
  state = {
    newTask: '',
    taskList : [
      {taskName:'new',id:1,checked:false}
    ],
    filterVariable: 'all'
  }

  _AddToDo = () => {
    if (this.state.newTask !== '') {
      const newTask = {
        taskName : this.state.newTask,
        id : Date.now(),
        checked: false
      }
      const newRemaining = [...this.state.taskList];
      newRemaining.push(newTask);
      this.setState({newTask:'',taskList:newRemaining}, () => {
        console.log(this.state.taskList);
      });
    }
  }

  _DeleteTask = (id) => {
    let newTaskList = [...this.state.taskList];
    newTaskList = newTaskList.filter(elem => {
      return elem.id !== id;
    })
    this.setState({taskList:newTaskList}, () => {
      console.log(this.state.taskList);
    });
  }

  _MarkAsDoneUndone = (id) => {
    const newTaskList = [...this.state.taskList];
    for (let elem of newTaskList) {
      if (elem.id === id) {
        elem.checked = !elem.checked;
      }
    }    
    this.setState({taskList:newTaskList}, () => {
      console.log(this.state.taskList);
    });
  }

  _MarkAllAsDone = () => {
    const newTaskList = [...this.state.taskList];
    for (let elem of newTaskList) {
      if (elem.checked !== true) {
        elem.checked = true;
      }
    }
    this.setState({taskList:newTaskList});
    console.log(newTaskList);
  }

  _ClearMarked = () => {
    let newTaskList = [...this.state.taskList];
    newTaskList = newTaskList.filter(elem => {
      return elem.checked === false;
    });
    this.setState({taskList:newTaskList});
  }

  _EditExistingTask = (event,id) => {
    let newList = [...this.state.taskList]
    for (let elem of newList) {
      if (elem.id === id) {
        elem.taskName = event.target.value
      }
    }
    this.setState({taskList:newList});
  }

  render() {
    let ToDoList = '';
    if (this.state.filterVariable === 'all') {
      ToDoList = this.state.taskList.map((task) => {
        // console.log('all');
        return <li key={task.id}>
                  <input type="checkbox" onChange={() => this._MarkAsDoneUndone(task.id)} checked={task.checked}/>
                  <input type="text" value={task.taskName} onChange={(event) => this._EditExistingTask(event,task.id)}/>
                  <button className='delete' onClick={() => this._DeleteTask(task.id)}>Delete</button>
                </li>;
      }); 
    }
    else if (this.state.filterVariable === 'remaining') {
      ToDoList = this.state.taskList.filter(elem => {
        return elem.checked === true
      })
      .map((task) => {
        // console.log('remaining');
        return <li key={task.id}>
                  <input type="checkbox" onChange={() => this._MarkAsDoneUndone(task.id)} checked={task.checked}/>
                  <input type="text" value={task.taskName} onChange={(event) => this._EditExistingTask(event,task.id)}/>
                  <button className='delete' onClick={() => this._DeleteTask(task.id)}>Delete</button>
                </li>;
      })
    }
    else if (this.state.filterVariable === 'done') {
      ToDoList = this.state.taskList.filter(elem => {
        return elem.checked === false
      })
      .map((task) => {
        // console.log('remaining');
        return <li key={task.id}>
                  <input type="checkbox" onChange={() => this._MarkAsDoneUndone(task.id)} checked={task.checked}/>
                  <input type="text" value={task.taskName} onChange={(event) => this._EditExistingTask(event,task.id)}/>
                  <button className='delete' onClick={() => this._DeleteTask(task.id)}>Delete</button>
                </li>;
      })
    }

    return (
      <div className="App">

        <h1>todos</h1>

        <input placeholder="Enter a new task"
          value={this.state.newTask} 
          onChange={(event) => {this.setState({newTask : event.target.value})}}/>
        <button onClick={this._AddToDo}>Add Task</button>
        <div className='features'>
          <button onClick={this._MarkAllAsDone}>check all</button>
          <button onClick={this._ClearMarked}>clear done</button>
        </div>
        
        <div>
          <ul>
            {ToDoList}
          </ul>
        </div>

        <div className='filter'>
          <h3 onClick={() => this.setState({filterVariable:'all'}, () => {console.log(this.state.filterVariable)})}>show all</h3>
          <h3 onClick={() => this.setState({filterVariable:'remaining'}, () => {console.log(this.state.filterVariable)})}>show done</h3>
          <h3 onClick={() => this.setState({filterVariable:'done'}, () => {console.log(this.state.filterVariable)})}>show remaining</h3>
        </div>
      </div>

    );
  }
}

export default App;
