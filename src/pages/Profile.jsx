import { useFormik } from "formik";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import TodoList from '../components/TodoList';
function Profile() {
  const addTodo = async () => {
    await addDoc(collection(db,"todos"), {
      todo: formik.values.title,
      createdAt: new Date(),
      completed: false,
    });
  }
  const formik = useFormik({
    initialValues: {
      title: ""
    },
    onSubmit: () => {
         addTodo()
    }
  });
  return (
    <div className='layout'>
      <div className='max-w-md w-72 md:w-80 mt-5 mb-5 border border-gray-200'>
        <form className='px-6 py-4 bg-white w-full rounded-sm' onSubmit={formik.handleSubmit}>
          <div className='layout'>
            <h3 className='mt-3 mb-5 font-bold text-blue-600'>Firebase CRUD App</h3>
          </div>
          <div className='pb-4 flex justify-center items-center'>
           <div>
           <input type="text" onBlur={formik.handleBlur} placeholder='Todo' id='title' name='title' value={formik.values.title} className='input' onChange={formik.handleChange}/>
           </div>
            <button type='submit' className='ml-2 py-2 px-2 w-32 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>Todo</button>
          </div>

          <div className='pb-4'>
            <TodoList/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile