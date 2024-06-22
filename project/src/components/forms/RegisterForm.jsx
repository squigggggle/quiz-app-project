import { queryClient } from "../../main";

import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const RegisterForm = () => {
  const registerForm = useForm();

  const { mutate: postRegisterMutation, data: registerData } = useMutation({
    mutationFn: (user) =>
      fetch(
        `${API_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            password: user.password,
            confirmPassword: user.confirmPassword
          }),
        },
      ).then((res) => {
        if (res.status === 200) {
          registerForm.reset((formValues) => ({
            ...formValues,
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
          }));
        }
        return res.json();
      }),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries("userData");
    },
  });

  const handleRegisterSubmit = (values) => postRegisterMutation(values);

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}>
        <label htmlFor="register-firstName">First Name</label>
        <input
            type="text" 
            id="register-firstName"
            name="firstName"
            {...registerForm.register("firstName")}
        />
        <label htmlFor="register-lastName">Last Name</label>
        <input 
            type="text"
            id="register-lastName"
            name="lastName" 
            {...registerForm.register("lastName")}
        />
        <label htmlFor="register-email">Email</label>
        <input
          type="text"
          id="register-email"
          name="email"
          {...registerForm.register("email")}
        />
        <label htmlFor="register-username">Username</label>
        <input 
            type="text"
            id="register-username"
            name="username" 
            {...registerForm.register("username")}
        />
        <label htmlFor="register-password">Password</label>
        <input
          type="password"
          id="register-password"
          name="password"
          {...registerForm.register("password")}
        />
        <label htmlFor="register-confirmPassword">Confirm Password</label>
        <input 
            type="password"
            id="register-confirmPassword"
            name="confirmPassword" 
            {...registerForm.register("confirmPassword")}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{registerData?.msg}</p>
    </>
  );
};

export default RegisterForm;
