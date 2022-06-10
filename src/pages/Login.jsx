import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
const Login = () => {
  const { signInWithEmail } = UserAuth();
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email Address").required("Email is required"),
      password: Yup.string().min(8, "Password must be 8 characters or more").required("Password is required"),

    }),
    onSubmit: () => {
      signWithEmail()
    }
  });

  const signWithEmail = async () => {
    await signInWithEmail(formik.values.email, formik.values.password);
    navigate("/profile")
  
  }
  return (
    <div className="grid place-items-center">
      <div className="max-w-sm w-72 md:w-96 mt-20 sm:w-full border border-gray-200">
        <form className="bg-white w-full px-6 py-4" onSubmit={formik.handleSubmit}>
          <div className="grid place-items-center">
            <h3 className="font-bold text-xl text-blue-600 font">Formik Validation</h3>
          </div>
          <div className="pb-4 mt-2">
            <label htmlFor="email" className="block font-bold pb-2">Email</label>
            <input onBlur={formik.handleBlur} id="email" name="email" type="text" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} className="input" />
            {formik.touched.email && formik.errors.email ? <p className="error">{formik.errors.email}</p> : null}
          </div>
          <div className="pb-4">
            <label htmlFor="password" className="block font-bold pb-2">Password</label>
            <input onBlur={formik.handleBlur} id="password" name="password" type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange}  className="input" />
            {formik.touched.password && formik.errors.password ? <p className="error">{formik.errors.password}</p> : null}
          </div>
          <div className="mt-2 mb-1">
          <button type="submit" className="py-2 px-2 w-full bg-blue-400 hover:bg-blue-600 border-none rounded-md text-white font-bold font">Submit</button>
          </div>
        </form>
        <div className="text-center mb-2">
            <p>Don't have an account? <span className="text-blue-500 font-bold"><Link to="/register">Register</Link></span></p>
        </div>
      </div>
    </div>
  )
}
export default Login;
