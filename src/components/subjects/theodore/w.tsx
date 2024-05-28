import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        テオドールが指定した位置に{Constants.W.duration}秒間維持される増幅スクリーンを生成します。<br />
        <br />
        増幅スクリーンを通過したテオドールの<span className={style.emphasis}>基本攻撃</span>の弾丸と<span className={style.emphasis}>スパーク弾</span>
        は的中した敵の周りに拡散されます。スクリーンを通過した基本攻撃は<Value skill="W" ratio={Constants.W.damage} />
        の追加スキルダメージを与え、スパーク弾の場合、投射体の速度と射程距離が増加します。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "追加ダメージ量", values: Constants.W.damage.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}