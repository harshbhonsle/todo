import { useState } from "react";

const generateRandomId = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  return (
    S4() + S4() + "-" +S4() +"-" +S4() +"-" +S4() +"-" +S4() +S4() +S4()
  );
};

function App() {
  const storeTask = JSON.parse(localStorage.getItem("tasks"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState(storeTask || []);
  // console.log(tasks)
  const handleSubmit = (e) => {
    e.preventDefault();

    const id = generateRandomId();
    const task = { id, title, description, completed: false };
    const newTask = [...tasks, task];
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));

    // reset values
    setTitle("");
    setDescription("");
  };

  // function to delete task
  const deleteTask = (taskId) => {
    // console.log('a')
    const afterDelete = tasks.filter((task) => taskId != task.id);
    setTasks(afterDelete);
    localStorage.setItem("tasks", JSON.stringify(afterDelete));
  };

  // completeToggle starts here
  const toggleCompleted = (taskId) => {
    const afterToggle = tasks.map((task) => {
      return taskId === task.id
        ? { ...task, completed: !task.completed }
        : task;
    });
    setTasks(afterToggle);
    localStorage.setItem("tasks", JSON.stringify(afterToggle));
  };

  return (
    <>
      <div className="text-center mt-10 text-6xl font-extrabold text-white ">
        ToDo List
      </div>
      <div className="flex justify-center mt-10   p-5">
        <form
          className=" w-1/3 p-4 flex flex-col gap-5 "
          onSubmit={handleSubmit}
        >
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Your todo List here"
            className="p-2 border rounded-lg bg-transparent text-white font-bold w-full"
            required
          />
          {/* for description */}
          <textarea
            placeholder="Describe your todo"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 bg-transparent border rounded-lg text-white font-semibold w-full"
            required
          />
          <button
            type="submit"
            className="bg-green-500 p-2 rounded-lg font-semibold hover:bg-green-400"
          >
            Add
          </button>
        </form>
      </div>

      {/* div for the task starts from here*/}
      <div className=" m-3  p-5">
        <h1 className="text-white text-center text-3xl font-bold pb-4 ">
          Here is your task list
        </h1>
        {/* display of task starts from here */}
        {tasks.length == 0 && (
          <p className="text-center mt-3 text-white font-2xl">
            {" "}
            No pending task so far{" "}
          </p>
        )}
        {tasks.length > 0 && (
          <div className="grid grid-cols-5 gap-5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex flex-col border p-3 rounded-lg relative ${
                  task.completed
                    ? "border-green-500 bg-green-500/80"
                    : "border-red-500"
                }`}
              >
                <p className="font-bold text-white text-lg">{task.title}</p>
                <p className="font-gray text-white text-sm">
                  {task.description}
                </p>
                <button
                  onClick={() => toggleCompleted(task.id)}
                  className="w-fit px-2 py-1 mt-2 border border-gray-500 bg-white/90 text-black text-xs rounded-lg hover:bg-white/70"
                >
                  {task.completed ? "Undone" : "Done"}
                </button>
                <p
                  className="absolute top-3 right-4 cursor-pointer text-white"
                  onClick={() => deleteTask(task.id)}
                >
                  ⛌
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
