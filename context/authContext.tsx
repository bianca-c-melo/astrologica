import React from "react";
import { onAuthStateChanged, getAuth, User, signOut as firebaseSignOut } from "firebase/auth";
import firebase_app from "@/util/firebase-config";
import { Progress } from "@nextui-org/react";

const auth = getAuth(firebase_app);

interface AuthContextType {
  user: User | null;
  signOut: () => Promise<void>; // Adicione a função signOut ao tipo do contexto
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  signOut: async () => {}, // Inicialize a função com uma função vazia
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth); 
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {loading ? <Progress isIndeterminate aria-label="Loading..." value={60} className="max-w-md" /> : children}
    </AuthContext.Provider>
  );
};
