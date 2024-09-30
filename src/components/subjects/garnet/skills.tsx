import Q1 from "resources/skills/garnet/Q1.png";
import R1 from "resources/skills/garnet/R1.png";

export function SkillImage(id: string): string | undefined {
    switch (id) {
        case "Q": return Q1;
        case "R": return R1;
    }
}