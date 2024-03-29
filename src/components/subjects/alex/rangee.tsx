import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const rangeW: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：アレックスの攻撃速度が{Constants.common.e_as[props.config.skillLevels.E]}％増加します。<br />
        <br />
        アレックスが指定した方向へパルススティングを発射して
        <Damage skill="E" constants={Constants.RangeE.damage} {...props} />のスキルダメージを与え、
        反対側に素早く移動して即時潜入状態になります。的中された対象は
        {Constants.RangeE.slow.duration}秒間移動速度が{Constants.RangeE.slow.effect[props.config.skillLevels.E]}％減少された後、
        徐々に回復します。
        スキル使用後には{Constants.RangeE.weapon_swap}秒間武器を1回交替できる状態になります。
        この状態は潜入が解除されたり武器を変更するとすぐに消えます。<br />
        潜入効果は6レベル以降に適用されます。
    </>
);

export default rangeW;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.RangeE.damage.base},
        {title: "追加攻撃速度(％)", values: Constants.common.e_as, percent: true},
        {title: "移動速度減少量(％)", values: Constants.RangeE.slow.effect, percent: true}
    ]
}