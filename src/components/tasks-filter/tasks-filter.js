import React, { useState } from 'react'
import checkPropTypes from 'prop-types'
import './tasks-filter.css'

const TasksFilter = (props) => {
  const [filter, setFilter] = useState('all')
  const { onFiltered } = props
  return (
    <ul className="filters">
      <li>
        <button
          onClick={() => {
            onFiltered('all')
            setFilter('all')
          }}
          className={filter === 'all' ? 'selected' : null}
        >
          All
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            onFiltered('active')
            setFilter('active')
          }}
          className={filter === 'active' ? 'selected' : null}
        >
          Active
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            onFiltered('completed')
            setFilter('completed')
          }}
          className={filter === 'completed' ? 'selected' : null}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.propTypes = {
  onFiltered: checkPropTypes.func.isRequired,
}

export default TasksFilter
