import { useState } from "react";

function App() {
  
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
    console.log(tasks)
  const handleSubmit =(e)=>{
    e.preventDefault();
    const task = {title,description};
    setTasks(prevTask => [...prevTask,task]);

    // reset values
    setTitle('')
    setDescription('');
  }

  return (
    <>
      <div className="text-center mt-10 text-5xl font-bold text-white ">
        ToDo List
      </div>
      <div className="flex justify-center mt-10 border border-blue-500">
        <div className="border border-red-500 w-1/3 p-3 flex flex-col gap-5">
          <input
            id="title"
            type="text"
            value={title}
            onChange={e=>setTitle(e.target.value)}
            placeholder="Enter Your todo List here"
            className="p-2 border rounded-lg bg-transparent text-white font-bold w-full"
          />
          {/* for description */}
          <textarea
            placeholder="Describe your todo"
            rows={4}
            value={description}
            onChange={e=>setDescription(e.target.value)}
            className="p-2 bg-transparent border rounded-lg text-white font-semibold w-full"
          />
          <button className="bg-green-500 p-2 rounded-lg font-semibold hover:bg-green-400" onClick={handleSubmit} >
            Add
          </button>
        </div>
      </div>

      {/* div for the task starts from here*/}
      <div className="">

      </div>
    </>
  );
}

export default App;
