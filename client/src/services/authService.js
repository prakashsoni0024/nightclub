import API from "./api";

export const loginAdmin = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const verifyAdmin = async () => {

  const token =
    localStorage.getItem("token");



  const res = await API.get(
    "/auth/verify",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );



  return res.data;
};

export const updateProfile = async (data) => {
  const token = localStorage.getItem("token");

  const res = await API.put("/auth/update-profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};