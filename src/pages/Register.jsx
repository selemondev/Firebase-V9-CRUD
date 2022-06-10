import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid Email Address").required("Email is required"),
      password: Yup.string().min(8, "Password must be 8 characters or more").required("Password is required"),
      confirmPassword: Yup.string().oneOf([Yup.ref("password"), null],"Passwords do not match" ).required("Please re-type your password")

    }),
    onSubmit:() => {
      registerFirebase()
    }
  });

  const { createUserWithEmail } = UserAuth();

  const registerFirebase = async () => {
      await createUserWithEmail(formik.values.email, formik.values.password);
      navigate("/profile")
  };
  return (
    <div className="grid place-items-center">
      <div className="max-w-sm w-72 md:w-96 mt-20 sm:w-full border border-gray-200">
        <form className="bg-white w-full px-6 py-4" onSubmit={formik.handleSubmit}>
          <div className="grid place-items-center">
            <h3 className="font-bold text-xl text-blue-600 font">Formik Validation</h3>
          </div>

          <div className="pb-4 mt-2">
            <label htmlFor="username" className="block font-bold pb-2">Username</label>
            <input onBlur={formik.handleBlur} id="username" name="username" type="text" placeholder="Username" value={formik.values.username} onChange={formik.handleChange} className="input" />
            {formik.touched.username && formik.errors.username ? <p className="error">{formik.errors.username}</p> : null}
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

          <div className="pb-4">
            <label htmlFor="password" className="block font-bold pb-2">Confirm Password</label>
            <input onBlur={formik.handleBlur} id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" value={formik.values.confirmPassword} onChange={formik.handleChange}  className="input" />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className="error">{formik.errors.confirmPassword}</p> : null}
          </div>

          <div className="mt-2 mb-2">
          <button type="submit" className="py-2 px-2 w-full bg-blue-400 hover:bg-blue-600 border-none rounded-md text-white font-bold">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Register;
