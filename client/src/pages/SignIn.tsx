import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { loginApi } from "../api/auth";
import { useAppContext } from "../contexts/AppContext";
import { SignInFormData } from "../types";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { isAuth } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const response = await loginApi(data);

    if (!response.success) {
      return toast.error(response.message);
    }

    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    toast.success(response.message);
    isAuth();
    navigate("/");
  });

  return (
    <form
      className=" flex flex-col gap-5 max-w-[600px] mx-auto px-8 sm:px-0"
      onSubmit={onSubmit}
    >
      <h2 className=" text-3xl font-bold text-center">Sign In</h2>
      <label className=" text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className=" border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className=" text-red-600 text-sm font-bold">
            {errors.email.message}
          </span>
        )}
      </label>
      <label className=" text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className=" border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className=" text-red-600 text-sm font-bold">
            {errors.password.message}
          </span>
        )}
      </label>

      <span>
        <button
          type="submit"
          className=" bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded-md"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
