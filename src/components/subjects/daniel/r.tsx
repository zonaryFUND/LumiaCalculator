import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        インスピレーションまたはインスピレーションの対象の影の中に入ることができます。ダニ エルが影に入る時、
        {Constants.R.silence}秒間敵を沈黙させ、最大{Constants.R.duration}秒間敵の影の中に潜り込みます。持続時間の間
        <Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを最大{Constants.R.damage_count}
        回まで与えられます。持続時間が終了されたり、スキルを再度使用すると敵の影から抜け出し、
        <Damage skill="R" constants={Constants.R.finish_damage} {...props} />のスキルダメージを与えます。ダメージ量は敵の失った体力に比例して
        <span className={style.losthp}>最大{Constants.R.finish_multiplier_max}％</span>まで増加します。
    </>
)

export default r;

export const values: ValuesProps = {
    additionalInfo: <>インスピレーションの対象の刻印が爆発した後、{Constants.R.window_after_w_blast}秒間対象に<span className={style.emphasis}>傑作</span>を使用できます。</>,
    parameters: [
        {title: "持続ダメージ量", values: Constants.R.damage.base},
        {title: "最後のダメージ量", values: Constants.R.finish_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}