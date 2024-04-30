import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Damage from "../damage";
import { skillLevel } from "../skill-damage";

const nunchaku: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);

    return (
        <>
            双節棍を素早く振り回して風を集め、移動速度が{Constants.nunchaku.movement_speed_penalty}
            ％減少します。もう一度使用すると指定した方向に飛ばします。風の塊は双節棍を振り回した時間によって
            <Damage skill="D" constants={Constants.nunchaku.min_damage} {...props} /> ~ <Damage skill="D" constants={Constants.nunchaku.max_damage} {...props} />
            のスキルダメージを与え、{Constants.nunchaku.stun_threshold}秒以上を振り回すと当たった対象を{Constants.nunchaku.stun}秒間気絶させます。
        </>
    );
}

export default nunchaku;

export const values: ValuesProps = {
    parameters: [
        {title: "最小ダメージ量", values: Constants.nunchaku.min_damage.base},
        {title: "最大ダメージ量", values: Constants.nunchaku.max_damage.base},
        {title: "クールダウン", values: Constants.nunchaku.cooldown},
    ]
}