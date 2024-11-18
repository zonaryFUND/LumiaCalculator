import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { StackName } from "./stack";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        シウカイが指定した味方または自分に料理を投げて対象の体力を<Value skill="W" ratio={Constants.W.heal} overrideExpression={{stack: {format: "料理人の情熱スタック数"}}} />
        回復させ、{Constants.W.defense.duration}秒間防御力を{Constants.W.defense.effect[props.skillLevel]}
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