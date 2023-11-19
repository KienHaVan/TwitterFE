import { useRouter, useSegments } from 'expo-router';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const segment = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isAuthGroup = segment[0] === '(auth)';
    if (!authToken && !isAuthGroup) {
      router.replace('/signIn');
    }
    if (authToken && isAuthGroup) {
      router.replace('/');
    }
  }, [authToken, segment]);

  const updateAuthToken = async (token: string) => {
    await SecureStore.setItemAsync('authToken', token);
    setAuthToken(token);
  };

  useEffect(() => {
    const loadAuthToken = async () => {
      const res = await SecureStore.getItemAsync('authToken');
      if (res) {
        setAuthToken(res);
      }
    };
    loadAuthToken();
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, updateAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
