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
  userEmail: string | null;
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
  userEmail: null,
  jwtToken: null,
  loading: false,
  error: null,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: null };
    case "AUTH_SUCCESS":
      const decoded: any = jwtDecode(action.payload.jwtToken);
      return {
        ...state,
        isAuthenticated: true,
        userEmail: decoded.username || decoded.email || null,
        jwtToken: action.payload.jwtToken,
        loading: false,
        error: null,
      };
    case "AUTH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "SIGN_OUT":
      return { ...initialState };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // On initial mount, check if a JWT token exists in cookies
  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token) {
      dispatch({ type: "AUTH_SUCCESS", payload: { jwtToken: token } });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
