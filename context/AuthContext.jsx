import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, token: null, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const login = () => {
  //   setIsLoggedIn(true);
  // };

  // const logout = () => {
  //   setIsLoggedIn(false);
  // };

  // return (
  //   <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
  //     {children}
  //   </AuthContext.Provider>
  // );
  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const user = await AsyncStorage.getItem("user");
        if (token && user) {
          dispatch({
            type: "LOGIN",
            payload: { token, user: JSON.parse(user) },
          });
        }
      } catch (error) {
        console.error("Failed to load auth state from AsyncStorage", error);
      }
    };
    loadAuthState();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axiosInstance.post("/auth/signin", {
        username,
        password,
      });
      const { token, user } = response.data;
      if (token && user) {
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "LOGIN", payload: { token, user } });
        return true;
      }
    } catch (error) {
      console.error("Login Failed: ", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout Failed: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
