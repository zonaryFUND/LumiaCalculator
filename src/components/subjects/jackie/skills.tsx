import * as React from "react";
import SkillsStandard from "../skills-list";
import Q1 from "resources/skills/jackie/Q1.png";

export function SkillImage(id: string): string | undefined {
    if (id == "Q") return Q1;
    return undefined;
}
