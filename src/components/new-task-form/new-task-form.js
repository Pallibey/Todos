import React, { useState } from 'react'
import checkPropTypes from 'prop-types'
import './new-task-form.css'

const NewTaskForm = (props) => {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)
  const { addNewItem } = props

  const onChange = (e) => {
    setLabel(e.target.value)
  }

  const onChangeMin = (e) => {
    setMin(e.target.value)
  }

  const onChangeSec = (e) => {
    setSec(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addNewItem(label, Number(min), Number(sec))
    setLabel('')
    setMin(0)
    setSec(0)
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={onChange}
          value={label.trimStart()}
          autoFocus
          required
        />
        <input
          className="new-todo-form__timer"
          type="number"
          max={99}
          placeholder="Min"
          value={min === 0 ? '' : min}
          onChange={onChangeMin}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          type="number"
          max={59}
          placeholder="Sec"
          value={sec === 0 ? '' : sec}
          onChange={onChangeSec}
          autoFocus
        />
        <input type="submit" hidden />
      </form>
    </header>
  )
}

NewTaskForm.defaultProps = {
  addNewItem: () => {},
}

NewTaskForm.propTypes = {
  addNewItem: checkPropTypes.func.isRequired,
}

export default NewTaskForm
