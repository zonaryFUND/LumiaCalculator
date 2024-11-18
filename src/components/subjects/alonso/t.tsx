import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        アロンソが移動不可効果を受けた場合、{Constants.T.immune}
        秒間移動不可効果免疫状態になります。この効果は{Constants.T.cooldown.constant[props.skillLevel]}
        秒間ダメージを受けなかった場合、再度活性化されます。<br />
        <br />
        アロンソがスキルで敵実験体を移動不可状態にさせた場合、一人あたり<Value skill="T" ratio={Constants.T.heal} />の体力を回復します。
    </>
);

export default t;

export const values: ValuesProps = {
    additionalInfo: <>移動不可状態：動けなかったり、移動命令を受けられない状態</>,
    parameters: [
        {title: "体力回復量", values: Constants.T.heal.base},
        {title: "最大体力係数", values: Constants.T.heal.maxHP},
        {title: "クールダウン", values: Constants.T.cooldown.constant}
    ]
}