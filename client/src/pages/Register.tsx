import {SubmitHandler, useForm} from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";
import { registerSchema } from "../schema/register";
import {zodResolver} from "@hookform/resolvers/zod";
 

type FormInputs = z.infer<typeof registerSchema>;


const Register = () => {
    const {register, handleSubmit,formState: {errors,isSubmitting}} = useForm<FormInputs>({
        resolver: zodResolver(registerSchema),
    });

    const submit : SubmitHandler<FormInputs> = (data) => {console.log(data)};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Register
        </h2>

        <form className="mt-6" onSubmit={handleSubmit(submit)}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-400 outline-none"
              placeholder="Enter your name"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-400 outline-none"
              placeholder="Enter your password"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
            disabled={isSubmitting}
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
