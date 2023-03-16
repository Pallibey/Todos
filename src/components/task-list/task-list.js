import checkPropTypes from 'prop-types'

import Task from '../task/task'
import './task-list.css'

function TaskList({ todoList, filter, onCompleted, onDeleted }) {
  const elements = todoList.map((task) => {
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
  })
  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  todoList: checkPropTypes.array,
  filter: checkPropTypes.string,
}

export default TaskList
