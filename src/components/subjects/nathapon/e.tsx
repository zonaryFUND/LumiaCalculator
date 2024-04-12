import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ナタポンがフレームを発射して、的中した敵に<Damage skill="E" constants={Constants.E.first_damage} {...props} />
            のスキルダメージを与えて移動速度を{Constants.E.slow.duration}秒間{Constants.E.slow.effect}
            ％減少させます。フレームを当てるとその位置に刻印を残し、{Constants.E.pull.from}秒後から
            {Constants.E.pull.until}秒間ナタポンは基本攻撃でフレームを当てた敵に<Damage skill="E" constants={Constants.E.second_damage} {...props} />
            のスキルダメージを与え、刻印を残した位置に戻します。この時、フレームを当てた敵に限って攻撃射程距離が
            {Constants.E.pull_basic_attack_range}mまで増加し、スローシャッターの追加ダメージが適用されます。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <>刻印を当てた敵を突き飛ばしたり、その敵が刻印から{Constants.E.mark_remain_range}m以上離れると刻印が消えます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.first_damage.base},
        {title: "再使用ダメージ量", values: Constants.E.second_damage.base},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}
