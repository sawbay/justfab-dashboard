import { Metadata } from "next";

export const DEFAULT_DESCRIPTION =
  "Yo! Welcome to the world of JustFAB! We're about to go on some crazy ride, where we'll probably try to save this whole damn thing for $ROOT & $FAB. You don't want to miss what's we are cooking!";

export const DEFAULT_ICONS = {
  icon: "/justfap/logo.png",
  shortcut: "/justfap/logo.png",
  apple: "/justfap/logo.png",
};

export const createMetadata = (title: string): Metadata => ({
  title: `JustFAB - ${title}`,
  description: DEFAULT_DESCRIPTION,
  icons: DEFAULT_ICONS,
});
