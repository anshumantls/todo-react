import React from 'react';
import './App.css';

//components
import Remaining from './components/Remaining';
import ToDoList from './components/ToDoList';
import ToDoContext from './context/todoContext';
import AddToDo from './components/AddToDo';
 
class App extends React.Component  {
  state = {
    newTask: '',
    taskList : [
      {taskName:'task 1',id:1,checked:false},
      {taskName:'task 2',id:2,checked:true}
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

  _OnChangeNewTask = (value) => {
    this.setState({newTask:value})
  }

  render() {
    let propList = '';
    if (this.state.filterVariable === 'all') {
      propList = this.state.taskList;
    }
    else if (this.state.filterVariable === 'remaining') {
      propList = this.state.taskList.filter(elem => {
        return elem.checked === true
      })
    }
    else if (this.state.filterVariable === 'done') {
      propList = this.state.taskList.filter(elem => {
        return elem.checked === false
      })
    }
    let remaining = 0;
    this.state.taskList.filter(elem => {
      if (elem.checked === false) {
        remaining++;
      }
      return true;
    })

    return (
      <div className="App">
        <ToDoContext.Provider value={
          {
            markAsDoneUndone: this._MarkAsDoneUndone,
            editTask: this._EditExistingTask,
            delete: this._DeleteTask,
            onChangeAdd: this._OnChangeNewTask,
            addToDo: this._AddToDo,
            newTaskValue: this.state.newTask
          }
        }>
          <h1>todos</h1>

          {/* <input placeholder="Enter a new task"
            value={this.state.newTask} 
            onChange={(event) => {this.setState({newTask : event.target.value})}}/>
          <button onClick={this._AddToDo}>Add Task</button> */}
          <AddToDo/>
          <div className='features'>
            <button onClick={this._MarkAllAsDone}>Mark All Done</button>
            <button onClick={this._ClearMarked}>Clear Done</button>
          </div>

          <div>
            <ul>
              <ToDoList list={propList}/>
            </ul>
          </div>

          <div className='filter'>
            <h3 onClick={() => this.setState({filterVariable:'all'}, () => {console.log(this.state.filterVariable)})}>Show All</h3>
            <h3 onClick={() => this.setState({filterVariable:'remaining'}, () => {console.log(this.state.filterVariable)})}>Show Completed</h3>
            <h3 onClick={() => this.setState({filterVariable:'done'}, () => {console.log(this.state.filterVariable)})}>Show Remaining</h3>
          </div>
          <Remaining value={remaining}/>
        </ToDoContext.Provider>

      </div>

    );
  }
}

export default App;
