import React, { useEffect, useState } from 'react'
import className from 'classnames'
import checkPropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './task.css'

const Task = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerID, setTimerID] = useState(0)
  const { changeData, isCompleted, onCompleted, onDeleted, id, label, created, timer } = props
  let liClassNames = className({ active: !isCompleted, completed: isCompleted })
  let taskView

  const clearTimerInterval = () => {
    clearTimeout(timerID)
    setTimerID(0)
    setIsTimerRunning(false)
  }

  const timerStart = () => {
    setIsTimerRunning(true)
    let newTimer = [0, 0]
    let min = timer[0]
    let sec = timer[1]
    if (sec < 1 && min > 0) {
      newTimer = [--min, 59]
    } else if (sec < 2 && min === 0) {
      newTimer = [0, 0]
    } else {
      newTimer = [min, --sec]
    }
    changeData(id, label, newTimer)
    setTimerID(0)
  }

  useEffect(() => {
    return () => {
      clearTimerInterval()
    }
  }, [])

  useEffect(() => {
    if (timer[0] === 0 && timer[1] === 0) {
      clearTimerInterval()
    }
    if (isTimerRunning && timerID === 0) {
      let newTimerID = setTimeout(() => {
        timerStart()
      }, 1000)
      setTimerID(newTimerID)
    }
  }, [timer, isTimerRunning])

  const onEditing = () => {
    setIsEditing(!isEditing)
  }

  const onChange = (e) => {
    changeData(id, e.target.value)
  }

  const onSubmitEditing = (e) => {
    e.preventDefault()
    onEditing()
  }

  if (isEditing) {
    taskView = (
      <form onSubmit={onSubmitEditing}>
        <input type="text" className="edit" onChange={onChange} defaultValue={label}></input>
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
            <span className="title">{label}</span>
            <span className="description">
              <button onClick={timerStart} className="icon icon-play"></button>
              <button onClick={clearTimerInterval} className="icon icon-pause"></button>
              {timer[1] < 10 ? `${timer[0]}:0${timer[1]}` : `${timer[0]}:${timer[1]}`}
            </span>
            <span className="description">
              {formatDistanceToNow(created, {
                includeSeconds: true,
                addSuffix: true,
              })}
            </span>
          </label>
          <button onClick={onEditing} className="icon icon-edit"></button>
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

Task.propTypes = {
  id: checkPropTypes.number,
  label: checkPropTypes.string,
  created: checkPropTypes.instanceOf(Date),
  isCompleted: checkPropTypes.bool,
  onDeleted: checkPropTypes.func.isRequired,
  onCompleted: checkPropTypes.func.isRequired,
}

Task.defaultProps = {
  label: '',
  isCompleted: false,
  onDeleted: () => {},
  onCompleted: () => {},
}

export default Task
