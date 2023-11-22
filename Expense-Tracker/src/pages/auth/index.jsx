import Cookies from "js-cookie";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate, Navigate } from "react-router-dom";
import googleIcon from "../../assets/google.png";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: result.user.uid,
      name: result.user.displayName,
      profilePhoto: result.user.photoURL,
      isAuth: true,
    };

    // Set the cookie
    Cookies.set("auth", JSON.stringify(authInfo), { expires: 7 });

    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <article className="dark:bg-indigo-950 dark:text-white h-screen w-screen">
      <h1 className="text-2xl text-center pt-4 mb-64 ">Expense Tracker</h1>

      <section className="dark:bg-slate-500 w-2/3 sm:w-1/3 m-auto rounded-3xl p-4 text-center flex flex-col justify-center items-center">
        <p className="text-xl">Sign In with Google to Continue</p>
        <button
          onClick={signInWithGoogle}
          className="flex items-center mt-4 rounded-md p-2 cursor-pointer bg-blue-700 overflow-y-auto"
        >
          <img src={googleIcon} alt="Google Icon" className="w-6 h-6 mr-2" />
          Sign In
        </button>
      </section>
    </article>
  );
};
