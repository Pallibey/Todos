import { formatDistance, subDays } from "date-fns";
import "./task.css";

const Task = (props) => {
  return (
    <li className={props.class}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">
            {props.class === "completed"
              ? "Completed task"
              : "Active task"}
          </span>
          <span className="created">
            {props.timeAgo + " ago"}
          </span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      {props.class === "editing" ? (
        <input
          type="text"
          className="edit"
          defaultValue="Editing task"
        ></input>
      ) : null}
    </li>
  );
};

export default Task;
