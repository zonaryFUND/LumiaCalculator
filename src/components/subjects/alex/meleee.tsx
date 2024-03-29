import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const meleeE: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：アレックスの攻撃速度が{Constants.common.e_as[props.config.skillLevels.E]}％増加し、
        ホログラムが持続する間は効果が2倍適用されます。<br />
        <br />
        アレックスが{Constants.MeleeE.duration}秒間維持されるホログラムを生成し、指定した方向へ素早く移動して即時潜入状態になります。<br />
        ホログラムは範囲内の敵に挑発をして{Constants.MeleeE.taunt}秒間自分を攻撃するようにします。<br />
        <br />
        スキル使用後には{Constants.MeleeE.weapon_swap}秒間武器を一度交替できる状態になります。
        この状態は潜入が解除されたり武器を変更するとすぐに消えます。<br />
        潜入効果は6レベル以降に適用されます。
    </>
);

export default meleeE;

export const values: ValuesProps = {
    parameters: [
        {title: "攻撃速度", values: Constants.common.e_as, percent: true},
        {title: "消費", values: Constants.MeleeE.sp_cost}
    ]
}