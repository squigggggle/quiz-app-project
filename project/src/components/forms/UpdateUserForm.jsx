import { queryClient } from "../../main";

import { useForm, useWatch } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const UpdateForm = () => {
  const updateForm = useForm();

  const { register, watch, formState: { errors } } = updateForm;

  const password = watch("password");

  const { mutate: postUpdateMutation, data: updateData } = useMutation({
    mutationFn: (user) =>
      fetch(
        `${API_URL}/api/v1/user`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
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
          updateForm.reset((formValues) => ({
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
      queryClient.invalidateQueries("userData");
    },
  });

  const handleUpdateSubmit = (values) => postUpdateMutation(values);

  return (
    <>
      <h2>Update</h2>
      <form onSubmit={updateForm.handleSubmit(handleUpdateSubmit)}>
        <label htmlFor="update-firstName">First Name</label>
        <input
            type="text" 
            id="update-firstName"
            name="firstName"
            {...updateForm.register("firstName")}
        />
        <label htmlFor="update-lastName">Last Name</label>
        <input 
            type="text"
            id="update-lastName"
            name="lastName" 
            {...updateForm.register("lastName")}
        />
        <label htmlFor="update-email">Email</label>
        <input
          type="text"
          id="update-email"
          name="email"
          {...updateForm.register("email")}
        />
        <label htmlFor="update-username">Username</label>
        <input 
            type="text"
            id="update-username"
            name="username" 
            {...updateForm.register("username")}
        />
        <label htmlFor="update-password">Password</label>
        <input
          type="password"
          id="update-password"
          name="password"
          {...updateForm.register("password")}
        />
        {/* yeah I used chatgpt for this section 
        prompt: "I want confirm password to be mandatory but only if password field was attempted to be sent in react hook form"*/}
        <label htmlFor="update-confirmPassword">Confirm Password</label>
        <input 
          type="password"
          id="update-confirmPassword"
          name="confirmPassword" 
          {...register("confirmPassword", {
            required: "Confirm Password is required when Password is provided",
            validate: (value) =>
              value === password || "Passwords do not match"
          })}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <button type="submit">Submit</button>
      </form>
      <p>{updateData?.msg}</p>
    </>
  );
};

export default UpdateForm;
