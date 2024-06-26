/**
 * @file Profile component that displays user profile information and allows updating the profile.
 * @author Jack Young
 */

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import UpdateForm from "./forms/UpdateUserForm";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      fetch(`${API_URL}/api/v1/user/current`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json()),
  });

  const toggleUpdate = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) return "Loading...";

  return (
    <>
      {userData.msg ? (
        <div>
          <p>{userData.msg}</p>
        </div>
      ) : isOpen ? (
        <UpdateForm />
      ) : (
        <>
          <h1>Profile</h1>
          <img src={userData.data.avatar} alt="Profile Avatar" />
          <p>First Name: {userData.data.firstName}</p>
          <p>Last Name: {userData.data.lastName}</p>
          <p>Username: {userData.data.username}</p>
          <p>Email: {userData.data.email}</p>
          {userData.data.role == "ADMIN_USER" ? (
            <p>you are admin woww</p>
          ) : null}
        </>
      )}
      <div>
        <button onClick={toggleUpdate}>Update Profile</button>
      </div>
    </>
  );
};

export default Profile;
