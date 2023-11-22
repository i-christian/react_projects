import Cookies from "js-cookie";

export const useGetUserInfo = () => {
  const authCookie = Cookies.get("auth");
  const { name, profilePhoto, userID, isAuth } = authCookie
    ? JSON.parse(authCookie)
    : {};
  return { name, profilePhoto, userID, isAuth };
};
