import React from 'react'
import className from 'classnames'
import checkPropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './task.css'

export default class Task extends React.Component {
  static defaultProps = {
    label: '',
    isCompleted: false,
    onDeleted: () => {},
    onCompleted: () => {},
  }

  static propTypes = {
    id: checkPropTypes.number,
    label: checkPropTypes.string,
    created: checkPropTypes.instanceOf(Date),
    isCompleted: checkPropTypes.bool,
    onDeleted: checkPropTypes.func.isRequired,
    onCompleted: checkPropTypes.func.isRequired,
  }

  state = {
    isEditing: false,
    label: '',
    timer: [0, 0],
    timerID: 0,
  }

  componentDidMount() {
    this.setState({ label: this.props.label, timer: this.props.timer })
  }

  componentWillUnmount() {
    if (this.state.timerID !== 0) {
      clearInterval(this.state.timerID)
    }
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

  timerStart = () => {
    this.setState({
      timerID: setInterval(() => {
        this.setState((state) => {
          let min = state.timer[0]
          let sec = state.timer[1]
          if (sec < 59) {
            return { timer: [min, ++sec] }
          } else {
            return { timer: [++min, 0] }
          }
        })
      }, 1000),
    })
  }

  timerPause = () => {
    if (this.state.timerID !== 0) {
      clearInterval(this.state.timerID)
      this.setState({ timerID: 0 })
    }
  }

  render() {
    const { id, created, isCompleted, onCompleted, onDeleted } = this.props
    let timer = this.state.timer
    let liClassNames = className({ active: !isCompleted, completed: isCompleted })
    let taskView
    if (this.state.isEditing) {
      taskView = (
        <form onSubmit={this.onSubmitEditing}>
          <input type="text" className="edit" onChange={this.onChange} defaultValue={this.state.label}></input>
        </form>
      )
    } else {
      taskView = (
        <li className={liClassNames}>
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
              <span className="title">{this.state.label}</span>
              <span className="description">
                <button onClick={this.timerStart} className="icon icon-play"></button>
                <button onClick={this.timerPause} className="icon icon-pause"></button>
                {timer[1] < 10 ? `${timer[0]}:0${timer[1]}` : `${timer[0]}:${timer[1]}`}
              </span>
              <span className="description">
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
    return taskView
  }
}
