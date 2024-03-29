import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        アロンソが移動不可効果を受けた場合、{Constants.T.immune}
        秒間移動不可効果免疫状態になります。この効果は{Constants.T.cooldown.constant[props.config.skillLevels.T]}
        秒間ダメージを受けなかった場合、再度活性化されます。<br />
        <br />
        アロンソがスキルで敵実験体を移動不可状態にさせた場合、一人あたり<Damage skill="T" constants={Constants.T.heal} {...props} />の体力を回復します。
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