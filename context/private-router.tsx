'use client';
import { useRouter } from "next/navigation";
import { useAuthContext } from "./authContext";

export default function PrivateRoute({ children }: { children: any }) {
    const { user } = useAuthContext();
    
    const router = useRouter();
  
    // Redirecione o usuário para a página de login se não estiver autenticado
    if (!user) {
      router.push("/"); // Substitua com a rota de login da sua aplicação
      return null;
    }
  
    // Renderize o conteúdo da rota privada se estiver autenticado
    return children;
  }