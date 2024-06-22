import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { isLoading, data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      fetch(
        `${API_URL}/api/v1/user/current`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
      ).then((res) => res.json()),
  });
  if (isLoading) return "Loading...";

  return (
    <>
      {userData.msg ? (
        <div>
          <h2>No user is logged in</h2>
          <p>{userData.msg}</p>
        </div>
      ) : (
        <>
          <h1>Profile</h1>
          <p>Username: {userData.data.username}</p>
          <p>Email: {userData.data.email}</p>
          {userData.data.role == "ADMIN_USER" ? (
            <p>you are admin woww</p>
          ) : null}
        </>
      )}
    </>
  );
};

export default Profile;
