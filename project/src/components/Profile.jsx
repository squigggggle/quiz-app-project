import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { isLoading, data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      fetch(
        "https://s1-24-id608001-project-squigggggle.onrender.com/api/v1/user/current",
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
        </>
      )}
    </>
  );
};

export default Profile;
