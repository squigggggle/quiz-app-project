import { queryClient } from "../../main";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const LoginForm = () => {
  const loginForm = useForm();

  const { mutate: postLoginMutation, data: loginData } = useMutation({
    mutationFn: (user) =>
      fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          username: user.username,
          password: user.password,
        }),
      }).then((res) => {
        if (res.status === 200) {
          loginForm.reset((formValues) => ({
            ...formValues,
            email: "",
            password: "",
          }));
        }
        return res.json();
      }),
    onSuccess: (data) => {
      localStorage.setItem("token", "Bearer " + data.token);
      queryClient.invalidateQueries("userData");
    },
  });

  const handleLoginSubmit = (values) => postLoginMutation(values);

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)}>
        <label htmlFor="login-email">Email</label>
        <input
          type="text"
          id="login-email"
          name="email"
          {...loginForm.register("email")}
        />
        <label htmlFor="login-username">Username</label>
        <input
          type="text"
          id="login-username"
          name="username"
          {...loginForm.register("username")}
        />
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          name="password"
          {...loginForm.register("password")}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{loginData?.msg}</p>

      <button
        onClick={() => {
          localStorage.removeItem("token");
        }}
      >
        Logout
      </button>
    </>
  );
};

export default LoginForm;
