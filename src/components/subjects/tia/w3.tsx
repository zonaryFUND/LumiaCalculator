import * as React from "react";
import W, { values } from "./w";
import color from "./color.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <W to={<span className={color.yellow}>黄色</span>} from="青色" {...props} />
)

export default w;

export { values }