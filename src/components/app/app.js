import React, { useState } from 'react'

import TaskList from '../task-list/task-list'
import NewTaskForm from '../new-task-form/new-task-form'
import Footer from '../footer/footer'

import './app.css'

const App = () => {
  const [tasksData, setTasksData] = useState([
    {
      label: 'Completed task',
      isCompleted: true,
      created: new Date(),
      id: 1,
      timer: [1, 0],
    },
    {
      label: 'Editing task',
      isCompleted: false,
      created: new Date(),
      id: 2,
      timer: [0, 30],
    },
    {
      label: 'Active task',
      isCompleted: false,
      created: new Date(),
      id: 3,
      timer: [0, 5],
    },
  ])
  const [filter, setFilter] = useState('all')
  const [itemsID, setItemsID] = useState(4)

  const addNewItem = (label, min, sec) => {
    setTasksData((tasksDataOld) => {
      const newItem = {
        label: label,
        isCompleted: false,
        isEditing: false,
        created: new Date(),
        id: itemsID,
        timer: [min, sec],
      }
      setItemsID(itemsID + 1)
      return [...tasksDataOld, newItem]
    })
  }

  const changeData = (id, label, timer = false) => {
    setTasksData((tasksDataOld) => {
      return tasksDataOld.map((element) => {
        if (element.id !== id) {
          return element
        } else if (!timer) {
          return { ...element, label: label }
        }
        return { ...element, label: label, timer: timer }
      })
    })
  }

  const onCompleted = (id, check) => {
    setTasksData((tasksDataOld) => {
      return tasksDataOld.map((el) => {
        if (el.id === id) {
          el.isCompleted = check
        }
        return el
      })
    })
  }

  const onDeleted = (id) => {
    setTasksData((tasksDataOld) => {
      const idx = tasksDataOld.findIndex((el) => el.id === id)
      return [...tasksDataOld.slice(0, idx), ...tasksDataOld.slice(idx + 1)]
    })
  }

  const onFiltered = (selected) => {
    setFilter(selected)
  }

  return (
    <section className="todoapp">
      <NewTaskForm addNewItem={addNewItem} />
      <section className="main">
        <TaskList
          todoList={tasksData}
          filter={filter}
          onCompleted={onCompleted}
          onDeleted={onDeleted}
          changeData={changeData}
        />
        <Footer todoList={tasksData} onDeleted={onDeleted} onFiltered={onFiltered} />
      </section>
    </section>
  )
}

export default App
