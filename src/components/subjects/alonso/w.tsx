import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        {Constants.W.duration}秒間攻撃を防ぐ磁場シールドを張って前方の敵から受けるダメージ量を
        {Constants.W.damage_reduction}%減少させます。<br />
        <br />
        シールドは{Constants.W.waves}回の波動を発射し、それぞれ
        <Value skill="W" ratio={Constants.W.damage} />
        のスキルダメージを与えます。波動は段々速く発射されます。<br />
        <br />
        再使用したり持続時間が終了すると<Value skill="W" ratio={Constants.W.final_damage} />
        のスキルダメージを与えます。
    </>
);

export default w;

export const values: ValuesProps = {
    additionalInfo: <>使用中アロンソの移動速度が{Constants.W.self_slow}%減少します。</>,
    parameters: [
        {title: "波動ダメージ量", values: Constants.W.damage.base},
        {title: "スキル終了ダメージ量", values: Constants.W.final_damage.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}