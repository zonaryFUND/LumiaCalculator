import * as React from "react";
import SkillsStandard from "../skills-standard";
import Q1 from "resources/skills/tazia/Q1.png";

export function SkillImage(id: string): string | undefined {
    if (id == "Q") return Q1;
    return undefined;
}

export default function() {
    return <SkillsStandard id="tazia" skillImage={SkillImage} />
}