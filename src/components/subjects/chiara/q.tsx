import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        キアラが不浄な気を噴出させて<Damage skill="Q" constants={Constants.Q.damage} {...props} />
        のスキルダメージを与えます。複数の不浄な気に的中された場合、2つ目の不浄な気からは不浄な気1つあたり
        <Damage skill="Q" constants={Constants.Q.additional_damage} {...props} />
        のスキルダメージを追加で与えられます。敵に的中すると{Constants.Q.heal_duration}秒にわたって
        <span className={style.emphasis}>的中した不浄の手1つあたり</span>
        <Damage skill="Q" constants={Constants.Q.heal} {...props} />の体力を回復します。
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