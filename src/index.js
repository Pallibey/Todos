import { createRoot } from "react-dom/client";
import TaskList from "./components/task-list/task-list";
import NewTaskForm from "./components/new-task-form/new-task-form";
import Footer from "./components/footer/footer";

import "./index.css";

const App = () => {
  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList />
        <Footer />
      </section>
    </section>
  );
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
