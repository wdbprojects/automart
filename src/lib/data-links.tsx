import { routes } from "@/config/routes";
import { SiYoutube, SiMeta, SiDiscord } from "@icons-pack/react-simple-icons";
import { Icon } from "lucide-react";

export const navLinks = [
  {
    id: 1,
    name: "Home",
    href: routes.home,
  },
  {
    id: 2,
    name: "About",
    href: routes.about,
  },
  {
    id: 3,
    name: "Inventory",
    href: routes.inventory,
  },
];

export const socialLinks = [
  {
    id: 1,
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <SiYoutube className="text-muted-foreground hover:text-primary h-5 w-5 transition-colors" />
    ),
  },
  {
    id: 2,
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <SiMeta className="text-muted-foreground hover:text-primary h-5 w-5 transition-colors" />
    ),
  },
  {
    id: 3,
    name: "Discord",
    href: "https://discord.com",
    icon: (
      <SiDiscord className="text-muted-foreground hover:text-primary h-5 w-5 transition-colors" />
    ),
  },
];

export const favoritesLinks = [
  {
    id: 1,
    name: "Project Management",
    url: "#",
    emoji: "📊",
  },
  {
    id: 2,
    name: "Personal Finance",
    url: "#",
    emoji: "💰",
  },
  {
    id: 3,
    name: "Movie & TV Shows",
    url: "#",
    emoji: "🎬",
  },
  {
    id: 4,
    name: "Daily Habits",
    url: "#",
    emoji: "📔",
  },
  {
    id: 5,
    name: "Health & Wellness",
    url: "#",
    emoji: "🍏",
  },
];
