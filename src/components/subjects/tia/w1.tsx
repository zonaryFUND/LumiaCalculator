import * as React from "react";
import { SubjectSkillProps } from "../props";
import W, { values } from "./w";
import color from "./color.styl";

const w: React.FC<SubjectSkillProps> = props => (
    <W to={<span className={color.red}>赤色</span>} from="黄色" {...props} />
)

export default w;

export { values }