import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ウィルソンがシセラを保護し、{Constants.W.duration}秒間すべてのダメージを受けない状態になって移動速度が
            {Constants.W.movement_speed}％増加します。<br />
            スキルを再使用したり、持続時間が終わる時、周りの敵に
            <Damage skill="W" constants={Constants.W.damage} {...props} />のスキルダメージを与えます。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "体力消耗量", values: Constants.W.hp_cost}
    ]
}
