import * as React from "react";
import W, { values } from "./w";
import color from "./color.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <W to={<span className={color.blue}>青色</span>} from="赤色" {...props} />
)

export default w;

export { values }