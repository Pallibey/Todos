import checkPropTypes from 'prop-types'

import TasksFilter from '../tasks-filter/tasks-filter'
import './footer.css'

const Footer = ({ todoList, onFiltered, onDeleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{`${todoList.reduce((acc, task) => acc + !task.isCompleted, 0)} items left`}</span>
      <TasksFilter onFiltered={onFiltered} />
      <button
        onClick={() => {
          todoList.forEach((task) => {
            if (task.isCompleted) {
              onDeleted(task.id)
            }
          })
        }}
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  todoList: checkPropTypes.arrayOf(
    checkPropTypes.shape({
      isCompleted: checkPropTypes.bool,
    })
  ),
  onDeleted: checkPropTypes.func.isRequired,
}

export default Footer
