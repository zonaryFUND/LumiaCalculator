import Q1 from "resources/skills/laura/Q1.png";

export function SkillImage(id: string): string | undefined {
    if (id == "Q") return Q1;
    return undefined;
}