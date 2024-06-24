import { queryClient } from "../../main";

import { useForm, useWatch } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const UpdateForm = () => {
  const updateForm = useForm();

  const {
    register,
    watch,
    formState: { errors },
  } = updateForm;

  const password = watch("password");

  // I used chatgpt for this
  // prompt: I want the body to dynamically fill with my form fields if there is something being sent in them for my react hook form
  const constructRequestBody = (user) => {
    const body = {};
    if (user.firstName) body.firstName = user.firstName;
    if (user.lastName) body.lastName = user.lastName;
    if (user.email) body.email = user.email;
    if (user.username) body.username = user.username;
    if (user.password) body.password = user.password;
    if (user.confirmPassword) body.confirmPassword = user.confirmPassword;
    return body;
  };

  const { mutate: postUpdateMutation, data: updateData } = useMutation({
    mutationFn: (user) =>
      fetch(`${API_URL}/api/v1/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(constructRequestBody(user)),
      }).then((res) => {
        if (res.status === 200) {
          updateForm.reset((formValues) => ({
            ...formValues,
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
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
        <label htmlFor="update-confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="update-confirmPassword"
          name="confirmPassword"
          {...register("confirmPassword")}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{updateData?.msg}</p>
    </>
  );
};

export default UpdateForm;
