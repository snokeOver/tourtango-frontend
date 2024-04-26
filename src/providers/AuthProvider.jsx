import { createContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../services/GAuth.js";
import { getPropertyIds } from "../services/storeCartItems.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [estates, setEstates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pageLoading, setPageLoading] = useState(false);
  const [regiSuccess, setRegiSuccess] = useState(false);
  const [logOutSuccess, setLogOutSuccess] = useState(false);
  const [currTheme, setCurrTheme] = useState("");
  const [profileUpdate, setProfileUpdate] = useState(false);

  const [toastMsg, setToastMsg] = useState("");

  const [cartNumber, setCartNumber] = useState(0);

  // Update the cart number
  useEffect(() => {
    if (user) {
      const currentNumber = getPropertyIds(user?.email);
      setCartNumber(currentNumber.length);
    }
  }, [user]);

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateProfileInfo = (user, data) => {
    // setLoading(true);
    return updateProfile(user, data);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  // Register with Google
  const googleRegister = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  // Register with Google
  const githubRegister = () => {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
  };

  // watch for the change in user
  useEffect(() => {
    // setLoading(true);
    const unSubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        setUser(currUser);
        setLoading(false);
        setProfileUpdate(false);
      } else {
        setUser(null);
        setLoading(false);
        setRegiSuccess(true);
        setProfileUpdate(false);
      }
      return () => unSubscribe();
    });
  }, [regiSuccess, profileUpdate]);

  // load the estate data
  // useEffect(() => {
  //   const currentPropertyArr = getPropertyIds(user?.email);
  //   setCartNumber(currentPropertyArr.length);
  //   fetch("/residents.json")
  //     .then((data) => data.json())
  //     .then((data) => setEstates(data));
  // }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    logOut,
    registerUser,
    updateProfileInfo,
    signInUser,
    setRegiSuccess,
    regiSuccess,
    googleRegister,
    githubRegister,
    logOutSuccess,
    setLogOutSuccess,
    estates,
    setEstates,
    cartNumber,
    setCartNumber,
    currTheme,
    setCurrTheme,
    pageLoading,
    setPageLoading,
    profileUpdate,
    setProfileUpdate,
    toastMsg,
    setToastMsg,
  };
  // console.log("inside context:", user?.photoURL);
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
