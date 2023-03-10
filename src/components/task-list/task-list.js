import {
  subMinutes,
  subSeconds,
  formatDistance,
} from "date-fns";
import Task from "../task/task";
import "./task-list.css";

const TaskList = () => {
  const todoClasses = ["completed", "editing"];
  const createdAgo = [
    formatDistance(subSeconds(new Date(), 17), new Date()),
    formatDistance(subMinutes(new Date(), 5), new Date()),
  ];
  return (
    <ul className="todo-list">
      <Task
        class={todoClasses[0]}
        timeAgo={createdAgo[0]}
      />
      <Task class={todoClasses[1]} />
      <Task timeAgo={createdAgo[1]} />
    </ul>
  );
};

export default TaskList;
