import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import validateManyFields from '../validations';

const Task = () => {

  const authState = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId === undefined ? "add" : "update";
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    description: ""
  });
  const [formErrors, setFormErrors] = useState({});


  useEffect(() => {
    document.title = mode === "add" ? "Add task" : "Update Task";
  }, [mode]);


  useEffect(() => {
    if (mode === "update") {
      const config = { url: `/tasks/${taskId}`, method: "get", headers: { Authorization: authState.token } };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({ description: data.task.description });
      });
    }
  }, [mode, authState, taskId, fetchData]);



  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleReset = e => {
    e.preventDefault();
    setFormData({
      description: task.description
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("task", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    if (mode === "add") {
      const config = { url: "/tasks", method: "post", data: formData, headers: { Authorization: authState.token } };
      fetchData(config).then(() => {
        navigate("/");
      });
    }
    else {
      const config = { url: `/tasks/${taskId}`, method: "put", data: formData, headers: { Authorization: authState.token } };
      fetchData(config).then(() => {
        navigate("/");
      });
    }
  }


  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
 <MainLayout>
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
    <form className="relative backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-lg p-8 w-full max-w-2xl animate-slideIn">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-center mb-6 text-white font-bold text-lg">
            {mode === "add" ? "Add New Task" : "Edit Task"}
          </h2>

          <div className="mb-6">
            <label htmlFor="description" className="text-white">Description</label>
            <Textarea
              type="description"
              name="description"
              id="description"
              value={formData.description}
              placeholder="Write here.."
              onChange={handleChange}
              className="bg-white/20 text-white placeholder-white/50 border border-white/30 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {fieldError("description")}
          </div>

          {/* Button Container with Proper Spacing */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              className="w-full md:w-auto py-2 text-white font-medium bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:scale-105 transition transform duration-300 shadow-md"
              onClick={handleSubmit}
            >
              {mode === "add" ? "Add Task" : "Update Task"}
            </button>

            <button
              className="w-full md:w-auto py-2 text-white font-medium bg-red-500 rounded-md hover:scale-105 transition transform duration-300 shadow-md"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

            {mode === "update" && (
              <button
                className="w-full md:w-auto py-2 text-white font-medium bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300 shadow-md"
                onClick={handleReset}
              >
                Reset
              </button>
            )}
          </div>
        </>
      )}
    </form>
  </div>
</MainLayout>


    </>
  )
}

export default Task