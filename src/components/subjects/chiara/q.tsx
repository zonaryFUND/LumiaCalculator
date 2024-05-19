import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        キアラが不浄な気を噴出させて<Value skill="Q" ratio={Constants.Q.damage} />
        のスキルダメージを与えます。複数の不浄な気に的中された場合、2つ目の不浄な気からは不浄な気1つあたり
        <Value skill="Q" ratio={Constants.Q.additional_damage} />
        のスキルダメージを追加で与えられます。敵に的中すると{Constants.Q.heal_duration}秒にわたって
        <span className={style.emphasis}>的中した不浄の手1つあたり</span>
        <Value skill="Q" ratio={Constants.Q.heal} />の体力を回復します。
    </>
)

export default q;

export const values: ValuesProps = {
    additionalInfo: <>複数の不浄の手に的中されても烙印スタックは1つのみ与えられます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "追加ダメージ量", values: Constants.Q.additional_damage.base},
        {title: "体力回復量", values: Constants.Q.heal.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}