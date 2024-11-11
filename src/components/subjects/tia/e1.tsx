import * as React from "react";
import E, { values } from "./e";
import color from "./color.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <E color={<span className={color.yellow}>黄色</span>} {...props} />
)

export default e;

export { values };