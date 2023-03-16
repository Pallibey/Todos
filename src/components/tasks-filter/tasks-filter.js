import React from 'react'
import checkPropTypes from 'prop-types'
import './tasks-filter.css'

export default class TasksFilter extends React.Component {
  state = {
    selectedFilter: 'all',
  }

  static propTypes = {
    onFiltered: checkPropTypes.func.isRequired,
  }

  render() {
    const { onFiltered } = this.props
    return (
      <ul className="filters">
        <li>
          <button
            onClick={() => {
              onFiltered('all')
              this.setState({ selectedFilter: 'all' })
            }}
            className={this.state.selectedFilter === 'all' ? 'selected' : null}
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              onFiltered('active')
              this.setState({ selectedFilter: 'active' })
            }}
            className={this.state.selectedFilter === 'active' ? 'selected' : null}
          >
            Active
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              onFiltered('completed')
              this.setState({
                selectedFilter: 'completed',
              })
            }}
            className={this.state.selectedFilter === 'completed' ? 'selected' : null}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
