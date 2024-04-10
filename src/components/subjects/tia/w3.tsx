import * as React from "react";
import { SubjectSkillProps } from "../props";
import W, { values } from "./w";
import color from "./color.styl";

const w: React.FC<SubjectSkillProps> = props => (
    <W to={<span className={color.yellow}>黄色</span>} from="青色" {...props} />
)

export default w;

export { values }