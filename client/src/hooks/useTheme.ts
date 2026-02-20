import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleTheme, setTheme } from "../features/theme/themeSlice";

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  return {
    mode,
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (theme: "dark" | "light") => dispatch(setTheme(theme)),
  };
};
