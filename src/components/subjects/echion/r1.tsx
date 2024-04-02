import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Base from "./r";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        <Base {...props} />
        <br />
        エンベノミゼーション(R): 指定した方向に制御できないVFを放出して<Damage skill="R" constants={Constants.R1.damage} {...props} />
        のスキルダメージを与えて、{Constants.R1.slow.duration}秒に渡って移動速度を{Constants.R1.slow.effect}％減少させます。エンベノミゼーションが敵実験体にダメージを与えると暴走持続時間が{Constants.R.extend}秒延長されます。<br />
        基本攻撃でダメージを与えるたびにエンベノミゼーションのクールダウンが{Constants.R.cooldown_reduction}秒減少します。
    </>
);

export default r;

export const values: ValuesProps = {
    additionalInfo: <>実験体やボスモンスターを倒すと、エンベノミゼーションのクールダウンが初期化されます。<br />エンベノミゼーションはクールダウン減少の影響を受けません。</>,
    parameters: [
        {title: "VFゲージ比例増幅量(％)", values: Constants.R.damage_amp_per_vf, percent: true},
        {title: "周りに与える固定ダメージ量", values: Constants.R.area_damage.base},
        {title: "エンベノミゼーションダメージ量", values: Constants.R1.damage.base},
        {title: "スキル攻撃追加ダメージ", values: Constants.R1.skill_damage_add, percent: true}
    ]
}