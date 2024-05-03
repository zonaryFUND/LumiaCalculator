import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：キャッチボールスタックを最大に獲得した状態でスキル使用できます。ウィリアムが
        {Constants.Q.duration}秒間攻撃速度が{Constants.Q.attack_speed[props.config.skillLevels.Q]}
        ％増加し、基本攻撃をする時にボールをもう一つ追加で投げて<Damage skill="Q" constants={Constants.Q.damage} {...props} />
        の基本攻撃ダメージを与えます。野球ボールをキャッチすると最初の攻撃にのみ追加ダメージが適用され、シャドウボールの持続時間が
        {Constants.Q.extend_duration}秒延長されます。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "合計攻撃力", values: Constants.Q.damage.attack.map(v => v - 100), percent: true},
        {title: "追加攻撃速度(％)", values: Constants.Q.attack_speed, percent: true},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}