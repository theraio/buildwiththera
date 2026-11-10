import { MonitorIcon, MoonIcon, SunIcon } from "~/components/icons";
import { ThemeOption } from "./types";

export const THEME_OPTIONS: ReadonlyArray<{
  value: ThemeOption;
  label: string;
  Icon: typeof SunIcon;
}> = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: MonitorIcon },
];
