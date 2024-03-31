import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Decimal from "decimal.js";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        指定した方向に突進して経路上の敵に<Damage skill="E" constants={Constants.E.damage} {...props} />
        のスキルダメージを与えます。刻印がない対象にダメージを与えた場合にはクールダウンが初期化されます。最初に的中した対象に
        {Constants.E.mark}秒間維持される刻印を残します。<br />
        <br />
        オーバーロード状態になると突進距離が減少します。<br />
        <br />
        VFゲージ増加量：{Constants.E.vf_gauge[props.config.skillLevels.E]}<br />
        使用時ダメージ増幅量：{new Decimal(props.config.gauge).times(Constants.R.damage_amp_per_vf[props.config.skillLevels.R]).toString()}％
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "VFゲージ増加量", values: Constants.E.vf_gauge},
        {title: "クールダウン", values: Constants.E.cooldown},
    ]
}