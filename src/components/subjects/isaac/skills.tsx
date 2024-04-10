import * as React from "react";
import SkillsStandard from "../skills-standard";
import E1 from "resources/skills/isaac/E1.png";

export function SkillImage(id: string): string | undefined {
    if (id == "E") return E1;
    return undefined;
}