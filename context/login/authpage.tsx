"use client";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import firebase_app from "@/util/firebase-config";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { ModalCadastro } from "@/components/modal";
import signUp from "@/util/firebase-signup";
import signIn from "@/util/firebase-signin";
import { useAuthContext } from "../authContext";

function AuthPage() {
  const [email, setEmail] = useState("");
  const { user } = useAuthContext();
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);
  const router = useRouter();

  if (user) {
    router.push("/tarot"); // Redirecione para a página após o login bem-sucedido.
    return null; // Não renderize nada na página de login
  }

  const toggleSignUpForm = () => {
    setIsSignUpFormOpen(!isSignUpFormOpen);
  };

  const auth = getAuth(firebase_app);
  auth.languageCode = "pt";

  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      router.push("/tarot"); // Redirecione para a página após o login bem-sucedido.
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async (event: any) => {
    event.preventDefault();

    try {
      const userCredential = await signIn(email, password);
      if (userCredential.result) {
        console.log("Login bem-sucedido:", userCredential);
        router.push("/tarot");
      } else {
        console.error("Login falhou.");
      }
    } catch (error) {
      if (error === "auth/invalid-login-credentials") {
        console.error("Email não registrado. Faça o cadastro primeiro.");
      } else {
        console.error("Erro ao fazer login:", error);
      }
    }
  };

  const handleForm = async (event: any) => {
    event.preventDefault();

    try {
      if (isSignUp) {
        router.push("/tarot");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async (
    fullName: string,
    email: string,
    password: any
  ) => {
    const { result, error } = await signUp(email, password);

    if (error) {
      console.error("Erro ao cadastrar usuário:", error);
    } else {
      console.log("Usuário cadastrado com sucesso:", result?.user);
      router.push("/tarot");
      setIsSignUpFormOpen(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className=" p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">
        Bem Vindo(a) a ASTROLÓGICA
        </h2>
        <br/>

        <form onSubmit={handleForm}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <Input
              id="email"
              size="lg"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="example@mail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <Input
              id="password"
              size="lg"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500 mt-2 block"
            >
              Esqueceu a senha?
            </a>
          </div>
          <br/>
          {isSignUpFormOpen && (
            <ModalCadastro
              isOpen={isSignUpFormOpen}
              onClose={() => setIsSignUpFormOpen(false)}
              onSubmit={handleSignUp}
            />
          )}
          <Button
            type="submit"
            size="lg"
            onClick={handleSignIn}
            color="primary"
            className="mt-6 w-full"
          >
            Entrar
          </Button>
          <br /> <br />
          <Button
            onClick={() => setIsSignUpFormOpen(true)}
            size="lg"
            color="primary"
            className="mt-6 w-full"
          >
            Cadastrar-se
          </Button>
        
          
        </form>

        <p className="mt-6 text-center text-gray-500">
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1"
          >
          </a>
        </p>
        <br />
        ou Faça login com as redes sociais
        <br />
        <div className="mt-6">
          <Button
            onClick={handleGoogleSignIn}
            size="lg"
            variant="ghost"
            className="w-full"
          >
            <FcGoogle className="mr-2" /> Entrar com Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
