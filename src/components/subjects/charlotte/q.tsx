import * as React from "react";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        シャーロットが指定した位置に{Constants.Q.duration}秒間維持される光の球体を生成します。光の球体は範囲内で最も近くにいる敵に付着します。その後、しばらくしてから爆発し、
        <Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与えて{Constants.Q.slow.duration}
        秒間移動速度を{Constants.Q.slow.effect}%減少させます。減少した移動速度は{Constants.Q.slow.duration}秒にわたって徐々にもとに戻ります。
    </>
)

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}