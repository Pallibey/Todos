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
    const text = e.target.value

    if ((text.match(/^\d+$/) && text.length < 3) || text === '') {
      this.setState({ min: text })
    }
  }

  onChangeSec = (e) => {
    const text = e.target.value
    let conditions = text.match(/^\d+$/) && text.length < 3
    if (conditions || text === '') {
      this.setState({ sec: text })
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (Number(this.state.sec) > 59) {
      alert('Введите корректное количество секунд (до 60)')
    } else {
      this.props.addNewItem(this.state.label, this.state.min, this.state.sec)
      this.setState({ label: '', min: 0, sec: 0 })
    }
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
            value={this.state.label.trimStart()}
            autoFocus
            required
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            value={this.state.min === 0 ? '' : this.state.min}
            onChange={this.onChangeMin}
            autoFocus
          />
          <input
            className="new-todo-form__timer"
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
