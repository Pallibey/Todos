import React from 'react'
import checkPropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
    min: 0,
    sec: 0,
  }

  static defaultProps = {
    addNewItem: () => {},
  }

  static propTypes = {
    addNewItem: checkPropTypes.func.isRequired,
  }

  onChange = (e) => {
    this.setState({ label: e.target.value })
  }

  onChangeMin = (e) => {
    this.setState({ min: e.target.value })
  }

  onChangeSec = (e) => {
    this.setState({ sec: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.addNewItem(this.state.label, Number(this.state.min), Number(this.state.sec))
    this.setState({ label: '', min: 0, sec: 0 })
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onChange}
            value={this.state.label.trimStart()}
            autoFocus
            required
          />
          <input
            className="new-todo-form__timer"
            type="number"
            max={99}
            placeholder="Min"
            value={this.state.min === 0 ? '' : this.state.min}
            onChange={this.onChangeMin}
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            type="number"
            max={59}
            placeholder="Sec"
            value={this.state.sec === 0 ? '' : this.state.sec}
            onChange={this.onChangeSec}
            autoFocus
          />
          <input type="submit" hidden />
        </form>
      </header>
    )
  }
}
