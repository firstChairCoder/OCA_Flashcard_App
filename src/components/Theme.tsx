import React from "react";
import type { ReactNode } from "react";
import {
  createTheme,
  ThemeProvider as ReStyleThemeProvider,
  createBox,
  createText,
  useTheme as useReTheme
} from "@shopify/restyle";
import type {
  StatusBarStyle,
  ViewStyle,
  TextStyle,
  ImageStyle
} from "react-native";

//Palette
const palette = {
  white: "#FFFFFF",
  black: "#000000",
  cyan: "#2CB9B0",
  lightCyan: "#E7F9F7",
  darkBlue: "#0C0D34",
  orange: "#FE5E33",
  yellow: "#FFC641",
  pink: "#FF87A2",
  darkPink: "#FF0058",
  violet: "#442CB9",
  lightBlue: "#BFEAF5",
  grey: "#F4F0EF",
  darkGrey: "#808080"
};

export const theme = createTheme({
  colors: {
    $background: palette.white,
    $primary: palette.cyan,
    $foreground: palette.grey,
    $secondary: palette.darkBlue,
    $info: palette.darkGrey
  },
  spacing: {
    "0": 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 48
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75
  },
  textVariants: {},
  breakpoints: {
    phone: 0,
    tablet: 768
  },
  statusBar: {
    barStyle: "light-content" as StatusBarStyle
  }
});

export type ThemeType = typeof theme;

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <ReStyleThemeProvider {...{ theme }}>{children}</ReStyleThemeProvider>
);
export const Box = createBox<ThemeType>();
export const Text = createText<ThemeType>();
export const useTheme = () => useReTheme<ThemeType>();

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const makeStyles =
  <T extends NamedStyles<T>>(styles: (theme: ThemeType) => T) =>
  () => {
    const currentTheme = useTheme();
    return styles(currentTheme);
  };
