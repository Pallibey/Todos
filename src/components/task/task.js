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
    timerID: 0,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  componentDidUpdate(prevProps) {
    if (this.props.timer !== prevProps.timer && this.props.timer[0] === 0 && this.props.timer[1] === 0) {
      this.clearTimerInterval()
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
    this.props.changeData(this.props.id, e.target.value)
  }

  onSubmitEditing = (e) => {
    e.preventDefault()
    this.onEditing()
  }

  clearTimerInterval = () => {
    if (this.state.timerID !== 0) {
      clearInterval(this.state.timerID)
      this.setState({ timerID: 0 })
    }
  }

  timerStart = () => {
    this.clearTimerInterval()
    let timer = [0, 0]
    let timerID = setInterval(() => {
      let min = this.props.timer[0]
      let sec = this.props.timer[1]
      if (sec < 1 && min > 0) {
        timer = [--min, 59]
      } else if (sec < 2) {
        timer = [0, 0]
      } else {
        timer = [min, --sec]
      }
      this.props.changeData(this.props.id, this.props.label, timer)
    }, 1000)
    this.setState({
      timerID: timerID,
    })
  }

  timerPause = () => {
    if (this.state.timerID !== 0) {
      clearInterval(this.state.timerID)
      this.setState({ timerID: 0 })
    }
  }

  render() {
    const { id, created, isCompleted, onCompleted, onDeleted, timer } = this.props
    let liClassNames = className({ active: !isCompleted, completed: isCompleted })
    let taskView
    if (this.state.isEditing) {
      taskView = (
        <form onSubmit={this.onSubmitEditing}>
          <input type="text" className="edit" onChange={this.onChange} defaultValue={this.props.label}></input>
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
              <span className="title">{this.props.label}</span>
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
