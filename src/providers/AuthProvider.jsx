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
import {
  deleteCartIdsFromLST,
  getCartIdsFromLST,
  storeCartIdsToLST,
} from "../services/storeCartItems.js";
import axios from "axios";
import {
  getCurrentTheme,
  storeCurrentTheme,
} from "../services/themeStorage.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [user, setUser] = useState(null);
  const [estates, setEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(false);
  const [regiSuccess, setRegiSuccess] = useState(false);
  const [logOutSuccess, setLogOutSuccess] = useState(false);
  const [currTheme, setCurrTheme] = useState("");
  const [profileUpdate, setProfileUpdate] = useState(false);
  const [spotsArr, setSpotsArr] = useState([]);
  const [toastMsg, setToastMsg] = useState("");

  const [cartNumber, setCartNumber] = useState(0);

  const setCart = () => {
    const currentNumber = getCartIdsFromLST(user?.uid);
    setCartNumber(currentNumber.length);
  };

  // function to Save the user preferences like theme-mood, cart items into MongoDb
  const storeUserPreference = async () => {
    const postData = {
      uid: user.uid,
      theme: getCurrentTheme(),
      cartIds: getCartIdsFromLST(user?.uid),
    };

    try {
      const response = await axios.post(
        `${baseURL}/api/user-preference`,
        postData
      );
      if (response.data) {
        console.log(response.data);
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  // Update the cart number
  useEffect(() => {
    if (user) {
      // get user preference from DB

      const fetchUserPreference = async () => {
        try {
          const response = await axios.get(
            `${baseURL}/api/user-preference/${user.uid}`
          );
          if (response.data) {
            setCurrTheme(response.data.theme);
            storeCurrentTheme(response.data.theme);
            deleteCartIdsFromLST(user?.uid);
            response.data.cartIds.map((id) => storeCartIdsToLST(user?.uid, id));
            setCart();
          } else {
            console.log(response.data);
            setCart();
            setCurrTheme("dark");
            storeCurrentTheme("dark");
          }
        } catch (err) {
          console.log(err.response);
          setCart();
          setCurrTheme("dark");
          storeCurrentTheme("dark");
        }
      };
      fetchUserPreference();
    }

    // Get all the tourist spot from the database
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/spots`);
        if (response.data) {
          setSpotsArr(response.data);
          setPageLoading(false);
        } else {
          console.log(response.data);
          setPageLoading(false);
        }
      } catch (err) {
        console.log(err.response);
        setPageLoading(false);
      }
    };
    if (!pageLoading) {
      setPageLoading(true);
      fetchData();
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
    btnLoading,
    setBtnLoading,
    spotsArr,
    setSpotsArr,
    storeUserPreference,
  };
  // console.log("inside context:", user?.photoURL);
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
