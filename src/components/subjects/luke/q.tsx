import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ルクが洗剤容器を投げて最初に的中した敵に<Damage skill="Q" constants={Constants.Q.first_damage} {...props} />のスキルダメージを与え、その敵の視界を獲得します。{Constants.Q.reuse}秒以内にスキルを再使用できます。<br />
            <br />
            再使用：ルクが洗剤容器に当たった敵に突進して敵のシールドを破壊し、<Damage skill="Q" constants={Constants.Q.second_damage} {...props} />のスキルダメージを与えます。<br />
            <br />
            <span className={style.strong}>進化効果</span>：対象の失った体力に比例して再使用時のダメージ量が最大{Constants.Q.enhance_max}％まで増加します。(対象の体力が{Constants.Q.enhance_max_target_hp}%の場合、最大値が適用されます。)
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "発射体ダメージ", values: Constants.Q.first_damage.base},
        {title: "突進ダメージ", values: Constants.Q.second_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
