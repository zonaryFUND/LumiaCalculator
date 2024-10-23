import * as React from "react";
import Q1 from "resources/skills/yumin/Q1.png";
import W1 from "resources/skills/yumin/W1.png";

export function SkillImage(id: string): string | undefined {
    if (id == "Q") return Q1;
    return undefined;
}
