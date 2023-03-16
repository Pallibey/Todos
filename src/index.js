import { createRoot } from 'react-dom/client'
import React from 'react'

import TaskList from './components/task-list/task-list'
import NewTaskForm from './components/new-task-form/new-task-form'
import Footer from './components/footer/footer'

import './index.css'

class App extends React.Component {
  state = {
    tasksData: [
      {
        label: 'Completed task',
        isCompleted: true,
        created: new Date(),
        id: 1,
      },
      {
        label: 'Editing task',
        isCompleted: false,
        created: new Date(),
        id: 2,
      },
      {
        label: 'Active task',
        isCompleted: false,
        created: new Date(),
        id: 3,
      },
    ],
    filter: 'all',
  }

  itemsID = 4

  addNewItem = (label) => {
    this.setState(({ tasksData }) => {
      const newItem = {
        label: label,
        isCompleted: false,
        isEditing: false,
        created: new Date(),
        id: this.itemsID++,
      }
      return {
        tasksData: [...tasksData, newItem],
      }
    })
  }

  onCompleted = (id, check) => {
    this.setState(({ tasksData }) => {
      return {
        tasksData: tasksData.map((el) => {
          if (el.id === id) {
            el.isCompleted = check
          }
          return el
        }),
      }
    })
  }

  onDeleted = (id) => {
    this.setState(({ tasksData }) => {
      const idx = tasksData.findIndex((el) => el.id === id)
      return {
        tasksData: [...tasksData.slice(0, idx), ...tasksData.slice(idx + 1)],
      }
    })
  }

  onFiltered = (selected) => {
    this.setState({ filter: selected })
  }

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm addNewItem={this.addNewItem} />
        <section className="main">
          <TaskList
            todoList={this.state.tasksData}
            filter={this.state.filter}
            onCompleted={this.onCompleted}
            onDeleted={this.onDeleted}
          />
          <Footer todoList={this.state.tasksData} onDeleted={this.onDeleted} onFiltered={this.onFiltered} />
        </section>
      </section>
    )
  }
}

const root = createRoot(document.getElementById('root'))

root.render(<App />)
