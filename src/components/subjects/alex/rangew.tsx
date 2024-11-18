import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const rangeW: React.FC<SubjectSkillProps> = props => (
    <>
        アレックスが指定した地点にターゲットマーカーを発射して範囲内の敵に
        <Value skill="W" ratio={Constants.RangeW.damage} />のスキルダメージを与え、
        対象の視界を{Constants.RangeW.duration[props.skillLevel]}秒間獲得します。<br />
        スキルが的中するとアレックスの基本攻撃の射程距離が
        {Constants.RangeW.duration[props.skillLevel]}秒間{Constants.RangeW.range}増加します。
    </>
);

export default rangeW;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.RangeQ.damage.base},
        {title: "維持時間", values: Constants.RangeW.duration},
        {title: "消費", values: Constants.RangeW.sp_cost},
        {title: "クールダウン", values: Constants.RangeW.cooldown},
    ]
}