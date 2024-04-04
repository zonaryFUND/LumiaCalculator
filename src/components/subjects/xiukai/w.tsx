import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import { StackName } from "./stack";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        シウカイが指定した味方または自分に料理を投げて対象の体力を<Damage skill="W" constants={Constants.W.heal} {...props} stackName={StackName} />
        回復させ、{Constants.W.defense.duration}秒間防御力を{Constants.W.defense.effect[props.config.skillLevels.W]}
        増加させます。料理人の情熱スタックに応じて回復量が増加します。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "体力回復量", values: Constants.W.heal.base},
        {title: "防御力増加量", values: Constants.W.defense.effect}
    ]
}