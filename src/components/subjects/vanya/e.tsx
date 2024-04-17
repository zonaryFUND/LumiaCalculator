import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ヴァーニャが阻止不可状態になって対象の地点まで飛んで行きながら敵に<Damage skill="E" constants={Constants.E.inner_damage} {...props} />
            のスキルダメージを与えます。羽の両端の範囲は<Damage skill="E" constants={Constants.E.outer_damage} {...props} />のスキルダメージを与えて移動速度を
            {Constants.E.slow.duration}秒間{Constants.E.slow.effect}％減少させます。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <>スキルキャスト時間は距離に比例して最大{Constants.E.max_cast_time}秒まで変化します。</>,
    parameters: [
        {title: "内側ダメージ量", values: Constants.E.inner_damage.base},
        {title: "外側ダメージ量", values: Constants.E.outer_damage.base},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}