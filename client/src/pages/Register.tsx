import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
// import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/auth";
import { useAppContext } from "../contexts/AppContext";
import { RegisterFormData } from "../types";

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const { isAuth } = useAppContext();

  // const mutation = useMutation(registerApi, {
  //   onSuccess: () => {
  //     console.log("User created successfully!");
  //   },
  //   onError: (error: any) => {
  //     console.log("Error in register User controller");
  //   },
  // });

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    // mutation.mutate(data);
    const response = await registerApi(data);

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
    <form className=" flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className=" text-3xl font-bold">Create an account</h2>

      <div className=" flex flex-col md:flex-row  gap-5 md:items-center ">
        <label
          htmlFor="firtName"
          className=" text-gray-700 text-sm font-bold flex-1"
        >
          First Name
          <input
            type="text"
            className=" border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className=" text-red-600 text-sm font-bold">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label
          htmlFor="lastName"
          className=" text-gray-700 text-sm font-bold flex-1"
        >
          Last Name
          <input
            type="text"
            className=" border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className=" text-red-600 text-sm font-bold">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>
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
      <label className=" text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className=" border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "This field is required";
              } else if (watch("password") !== value) {
                return "Passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className=" text-red-600 text-sm font-bold">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>

      <span>
        <button
          type="submit"
          className=" bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded-md"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
