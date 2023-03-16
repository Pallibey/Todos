import React from 'react'
import checkPropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
  }

  static propTypes = {
    addNewItem: checkPropTypes.func.isRequired,
  }

  onChange = (e) => {
    this.setState({ label: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.addNewItem(this.state.label)
    this.setState({ label: '' })
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onChange}
            value={this.state.label}
            autoFocus
          />
        </form>
      </header>
    )
  }
}
