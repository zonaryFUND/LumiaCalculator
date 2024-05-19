import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        アビゲイルが次元の隙間を通り抜けて敵周辺の指定した位置に瞬間移動し、
        <Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えます。<br />
        <br />
        <span className={style.emphasis}>座標</span>が残った対象に使用すると
        <span className={style.emphasis}>ワープスラッシュ</span>のクールダウンが初期化されます。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}