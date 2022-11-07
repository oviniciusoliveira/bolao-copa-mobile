import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

WebBrowser.maybeCompleteAuthSession();

type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

type AuthContextData = {
  user: User | null;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_CLIENT_ID,
  });

  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(accessToken: string) {
    setIsUserLoading(true);
    try {
      const tokenResponse = await api.post("/users", {
        access_token: accessToken,
      });
      const { token } = tokenResponse.data;

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const userResponse = await api.get("/me");
      const user = userResponse.data.user;

      setUser({
        id: user.sub,
        name: user.name,
        avatarUrl: user.avatarUrl,
      });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    if (response?.type === "success" && response.authentication.accessToken) {
      const { authentication } = response;
      signInWithGoogle(authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
