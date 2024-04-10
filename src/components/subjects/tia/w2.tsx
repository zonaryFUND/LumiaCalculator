import * as React from "react";
import { SubjectSkillProps } from "../props";
import W, { values } from "./w";
import color from "./color.styl";

const w: React.FC<SubjectSkillProps> = props => (
    <W to={<span className={color.blue}>青色</span>} from="赤色" {...props} />
)

export default w;

export { values }