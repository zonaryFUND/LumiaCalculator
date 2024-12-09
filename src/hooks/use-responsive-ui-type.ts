import { useWindowSize } from "react-use";

export function useResponsiveUIType(): "full" | "menu-collapse" | "mobile" {
    const { width } = useWindowSize();
    if (width >= 1400) return "full";
    if (width >= 1000) return "menu-collapse";
    return "mobile";
}