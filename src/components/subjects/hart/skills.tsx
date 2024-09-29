import Q2 from "resources/skills/hart/Q2.png";
import W1 from "resources/skills/hart/W1.png";
import E2 from "resources/skills/hart/E2.png";
import R2 from "resources/skills/hart/R2.png";
import T2 from "resources/skills/hart/T2.png";

export function SkillImage(id: string): string | undefined {
    switch (id) {
        case "Q": return Q2;
        case "W": return W1;
        case "E": return E2;
        case "R": return R2;
        case "T": return T2;
    }
}