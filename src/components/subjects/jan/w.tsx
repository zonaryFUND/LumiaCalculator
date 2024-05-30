import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        ヤンがキックで敵に<Value skill="W" ratio={Constants.W.damage} />のダメージを与えます。外側の範囲に当たった敵を突き飛ばし、突き飛ばされた敵が壁にぶつかると{Constants.W.stun}秒間気絶させます。<br />
        <span className={style.enhance}>強化効果</span>：ダメージ量が<Value skill="W" ratio={Constants.W.enhanced_damage} />
        に増加して、トマホークスピンの範囲内にいるすべての敵を突き飛ばし、突き飛ばされた敵が壁にぶつかると{Constants.W.enhanced_stun}秒間気絶させます。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "強化されたダメージ量", values: Constants.W.enhanced_damage.base},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}