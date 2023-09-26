'use client';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export const Navbar = () => {

  const { user, signOut } = useAuthContext(); // Obtenha o usuário e a função de logout do contexto
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(); // Chame a função de logout
      router.push("/"); // Redirecione para a página inicial após o logout
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent justify="start">
        <NavbarMenuToggle />
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">ASTROLÓGICA</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarMenu>
          <div className="">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NavbarContent>

      <NavbarContent justify="end">
        <ul className="hidden lg:flex gap-4 justify-end ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
        <ThemeSwitch />
        {user && (
            <NavbarItem>
              <Button
                color='primary'
                onClick={handleLogout}
              >
                Logout
              </Button>
            </NavbarItem>
          )}
      </NavbarContent>
    </NextUINavbar>
  );
};
