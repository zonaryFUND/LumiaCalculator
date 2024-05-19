import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Base from "./r";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        <Base {...props} />
        <br />
        エンベノミゼーション(R): 指定した方向に制御できないVFを放出して<Value skill="R" ratio={Constants.R3.damage} />
        のスキルダメージを与えます。エンベノミゼーションが敵実験体にダメージを与えると、暴走持続時間が{Constants.R.extend}秒延長されます。<br />
        基本攻撃でダメージを与えるたびにエンベノミゼーションのクールダウンが{Constants.R.cooldown_reduction}秒減少します。
    </>
);

export default r;

export const values: ValuesProps = {
    additionalInfo: <>実験体やボスモンスターを倒すと、エンベノミゼーションのクールダウンが初期化されます。<br />エンベノミゼーションはクールダウン減少の影響を受けません。</>,
    parameters: [
        {title: "VFゲージ比例増幅量(%)", values: Constants.R.damage_amp_per_vf, percent: true},
        {title: "周りに与える固定ダメージ量", values: Constants.R.area_damage.base},
        {title: "エンベノミゼーションダメージ量", values: Constants.R3.damage.base},
        {title: "攻撃速度増加量(%)", values: Constants.R3.attack_speed, percent: true}
    ]
}