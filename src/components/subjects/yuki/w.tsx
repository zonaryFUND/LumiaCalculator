import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：ダメージを与えるたびにクールダウンが{Constants.W.cooldown_reduction}秒ずつ減少します。<br />
        <br />
        雪が{Constants.W.channeling}秒間服装を整えます。服装を整える間、受けるダメージが{Constants.W.damage_reduction}％減少し、打ち落としのクールダウンが
        {Constants.W.e_cooldown_reduction}秒減少します。スキルを使用した後、端正な服装のボタンが4回復します。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}