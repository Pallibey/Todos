import checkPropTypes from 'prop-types'
import React from 'react'

import Task from '../task/task'
import './task-list.css'

export default class TaskList extends React.Component {
  render() {
    const { todoList, onCompleted, onDeleted, filter } = this.props
    return (
      <ul className="todo-list">
        {todoList.map((task) => {
          const newTask = <Task key={task.id} {...task} onCompleted={onCompleted} onDeleted={onDeleted} />
          if (filter === 'all') {
            return newTask
          }
          if (filter === 'active' && !task.isCompleted) {
            return newTask
          }
          if (filter === 'completed' && task.isCompleted) {
            return newTask
          }
        })}
      </ul>
    )
  }
}

TaskList.defaultProps = {
  todoList: {},
  filter: 'All',
}

TaskList.propTypes = {
  todoList: checkPropTypes.array,
  filter: checkPropTypes.string,
}
