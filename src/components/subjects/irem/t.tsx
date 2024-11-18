import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        イレムは他の地域に侵入すると警戒して視界が{Constants.T.vision[props.skillLevel]}増加します。同じ地域に
        {Constants.T.stay}秒間留まってその地域に慣れると、視界が増加する代わりに他の能力値が強化されます。<br />
        イレムの時：攻撃速度増加 {Constants.T.attack_speed[props.skillLevel]}%<br />
        ネコの時：防御力増加 {Constants.T.defense[props.skillLevel]}<br />
        <br />
        魚で作った食べ物を食べると、食べ物最大回復量の{Constants.T.fish_food}%の体力をすぐに回復します。
    </>
);

export default t;

// NOTE:
// Increased amount of attack speed and defense depends on the level of this skill.
// However, those are not indicated in-game "level-dependent values" area.
export const values: ValuesProps = {
    parameters: [
        {title: "視界増加量", values: Constants.T.vision}
    ]
}