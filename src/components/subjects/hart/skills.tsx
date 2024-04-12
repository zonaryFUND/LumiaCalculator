import Q1 from "resources/skills/hart/Q1.png";
import W1 from "resources/skills/hart/W1.png";
import E1 from "resources/skills/hart/E1.png";
import R1 from "resources/skills/hart/R1.png";
import T1 from "resources/skills/hart/T1.png";

export function SkillImage(id: string): string | undefined {
    switch (id) {
        case "Q": return Q1;
        case "W": return W1;
        case "E": return E1;
        case "R": return R1;
        case "T": return T1;
    }
}