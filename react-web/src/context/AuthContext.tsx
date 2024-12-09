// src/context/AuthContext.tsx
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string | null; [key: string]: any } | null;
  jwtToken: string | null;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: { jwtToken: string } }
  | { type: "AUTH_FAILURE"; payload: string }
  | { type: "SIGN_OUT" };

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  jwtToken: null,
  loading: false,
  error: null,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | null>(null);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: null };
    case "AUTH_SUCCESS":
      const { jwtToken } = action.payload;
      if (!jwtToken || jwtToken.split(".").length !== 3) {
        console.error("Invalid token format");
        return { ...state, error: "Invalid token format", loading: false };
      }
      try {
        const decoded: any = jwtDecode(jwtToken);
        return {
          ...state,
          isAuthenticated: true,
          user: {
            email: decoded.email || decoded.username || null,
            ...decoded,
          },
          jwtToken,
          loading: false,
          error: null,
        };
      } catch (error) {
        console.error("Error decoding token", error);
        return { ...state, error: "Error decoding token", loading: false };
      }
    case "AUTH_FAILURE":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case "SIGN_OUT":
      Cookies.remove("jwtToken");
      return { ...initialState };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token && token.split(".").length === 3) {
      try {
        dispatch({ type: "AUTH_SUCCESS", payload: { jwtToken: token } });
      } catch (err) {
        console.error("Failed to decode token", err);
        dispatch({ type: "SIGN_OUT" });
      }
    } else if (token) {
      console.error("Invalid token format");
      dispatch({ type: "SIGN_OUT" });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
