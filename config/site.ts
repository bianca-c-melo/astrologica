export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ASTROLOGICA",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Tarot",
      href: "/tarot",
    },
    {
      label: "Horóscopo",
      href: "/horoscope",
    },
    {
      label: "Sobre",
      href: "/sobre",
    },
  ],
  navMenuItems: [
    {
      label: "Perfil",
      href: "/perfil",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {},
};
