import * as React from "react";
import { SubjectSkillProps } from "../props";
import E, { values } from "./e";
import color from "./color.styl";

const e: React.FC<SubjectSkillProps> = props => (
    <E color={<span className={color.yellow}>黄色</span>} {...props} />
)

export default e;

export { values };