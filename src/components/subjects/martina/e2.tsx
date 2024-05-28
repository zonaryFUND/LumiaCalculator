import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マルティナが現在の位置にビデオテープを残して指定した方向に素早く移動します。以降、最大{Constants.E2.duration}秒間早戻し状態を維持します。早戻し状態ではマルティナの移動速度が
            {Constants.E2.movement_speed}%増加します。<br />
            <br />
            早戻し状態が終了すると、妨害効果免疫状態になり、ビデオテープの位置に素早く戻ります。この際、マルティナに触れた敵は<Damage skill="E" constants={Constants.E2.damage} {...props} />
            のスキルダメージを与えられ、{Constants.E2.stun}秒間気絶します。マルティナはビデオテープの位置に戻った後、早戻し状態の間に敵から受けたダメージの
            {Constants.E2.heal[props.config.skillLevels.E]}%の体力を回復します。
            <br />
            再使用：ビデオテープの位置により速く戻ります。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E2.damage.base},
        {title: "クールダウン", values: Constants.E2.cooldown},
        {title: "体力回復量(%)", values: Constants.E2.heal, percent: true}
    ]
}
