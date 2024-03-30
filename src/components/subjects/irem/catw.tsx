import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const catw: React.FC<SubjectSkillProps> = props => (
    <>
        イレムが空中で回転しながら尻尾を強く振り下ろし、範囲内の敵に
        <Damage skill="W" constants={Constants.CatW.damage} {...props} />のスキルダメージを与えて
        {Constants.CatW.airborne}秒間空中に浮かせます。<br />
        このスキルが敵に的中すると<span className={style.emphasis}>こっちだよ～</span>と<span className={style.emphasis}>ネコジャンプ！</span>
        のクールダウン{Constants.CatW.cooldown_reduction}秒が減少します。
    </>
);

export default catw;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.CatW.damage.base},
        {title: "消費", values: Constants.CatW.sp_cost}
    ]
}