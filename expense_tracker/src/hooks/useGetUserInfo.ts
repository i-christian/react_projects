import Cookies from "js-cookie";

interface UserInfo {
  name?: string;
  profilePhoto?: string;
  userID?: string;
  isAuth?: boolean;
}

export const useGetUserInfo = (): UserInfo => {
  const authCookie = Cookies.get("auth");
  const { name, profilePhoto, userID, isAuth } = authCookie
    ? JSON.parse(authCookie)
    : {};
  return { name, profilePhoto, userID, isAuth };
};
