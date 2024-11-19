import * as React from "react";
import SkillsStandard from "../skills-list";
import Q2 from "resources/skills/estelle/Q2.png";

export function SkillImage(id: string): string | undefined {
    if (id == "Q") return Q2;
    return undefined;
}