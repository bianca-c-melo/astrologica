"use client";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { EyeSlashFilledIcon } from "./eyeSlash";
import { EyeFilledIcon } from "./eyeFilled";
import { isValidEmail, isValidPassword } from "@/util/validator";

export const ModalCadastro = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: any;
  onClose: any;
  onSubmit: any;
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isFullNameValid, setIsFullNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (isFullNameValid && isEmailValid && isPasswordValid && acceptedTerms) {
      onSubmit(fullName, email, password);
    }
  };

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const isPasswordValid = isValidPassword(newPassword);
    setIsPasswordValid(isPasswordValid);
  };

  const handleFullNameChange = (e: any) => {
    const newFullName = e.target.value;
    setFullName(newFullName);
    const isValidFullName = newFullName.trim() !== "";
    setIsFullNameValid(isValidFullName);
  };

  const handleEmailChange = (e: any) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const validEmail = isValidEmail(newEmail);
    setIsEmailValid(validEmail);
  };

  const handleTermsCheckboxChange = () => {
    setAcceptedTerms(!acceptedTerms);
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onClose}
      radius="lg"
      classNames={{
        body: "py-6",
        // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        <form onSubmit={handleFormSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            Cadastrar-se
          </ModalHeader>
          <ModalBody>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome Completo
              </label>

              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  id="fullName"
                  size="lg"
                  name="fullName"
                  type="text"
                  variant="bordered"
                  autoComplete="name"
                  required
                  className="max-w-xs"
                  placeholder="Nome Completo"
                  onChange={handleFullNameChange}
                  errorMessage={
                    isFullNameValid
                      ? null
                      : "Por favor, insira um nome válido."
                  }
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>

              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  id="email"
                  size="lg"
                  name="email"
                  type="email"
                  variant="bordered"
                  autoComplete="email"
                  required
                  className="max-w-xs"
                  placeholder="Email"
                  onChange={handleEmailChange}
                  errorMessage={
                    isEmailValid
                      ? null
                      : "Por favor, insira um email válido.."
                  }
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Senha
              </label>

              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  label="Password"
                  variant="bordered"
                  placeholder="Enter your password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  isInvalid={!isPasswordValid}
                  errorMessage={
                    isPasswordValid
                      ? null
                      : "Mínimo de 8 caracteres e conter letras e números"
                  }
                  className="max-w-xs"
                />
              </div>
            </div>
            <div>
              <Checkbox
                checked={acceptedTerms}
                onChange={handleTermsCheckboxChange}
              >
                Aceito os Termos de Uso
              </Checkbox>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              variant="light"
              onPress={onClose}
              className="text-white"
            >
              Fechar
            </Button>
            <Button
              className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20 text-white"
              type="submit"
            >
              Cadastrar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
