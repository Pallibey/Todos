import React from 'react'
import checkPropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './task.css'

export default class Task extends React.Component {
  state = {
    isEditing: false,
    label: this.props.label,
  }

  static propTypes = {
    id: checkPropTypes.number,
    label: checkPropTypes.string,
    created: checkPropTypes.instanceOf(Date),
    isCompleted: checkPropTypes.bool,
    onDeleted: checkPropTypes.func.isRequired,
    onCompleted: checkPropTypes.func.isRequired,
  }

  onEditing = () => {
    this.setState(({ isEditing }) => {
      return {
        isEditing: !isEditing,
      }
    })
  }

  onChange = (e) => {
    this.setState({ label: e.target.value })
  }

  onSubmitEditing = (e) => {
    e.preventDefault()
    this.onEditing()
  }

  render() {
    const { id, created, isCompleted, onCompleted, onDeleted } = this.props
    if (this.state.isEditing) {
      return (
        <form onSubmit={this.onSubmitEditing}>
          <input type="text" className="edit" onChange={this.onChange} defaultValue={this.state.label}></input>
        </form>
      )
    }
    return (
      <li className={isCompleted ? 'completed' : 'active'}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            onChange={(e) => {
              onCompleted(id, e.target.checked)
            }}
            checked={isCompleted}
          />
          <label htmlFor={id}>
            <span className="description">{this.state.label}</span>
            <span className="created">
              {formatDistanceToNow(created, {
                includeSeconds: true,
                addSuffix: true,
              })}
            </span>
          </label>
          <button
            onClick={() => {
              this.onEditing()
            }}
            className="icon icon-edit"
          ></button>
          <button
            className="icon icon-destroy"
            onClick={() => {
              onDeleted(id)
            }}
          ></button>
        </div>
      </li>
    )
  }
}
