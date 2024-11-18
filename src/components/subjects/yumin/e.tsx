import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import style from "components/tooltip/tooltip.module.styl";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果：</span>スキルが的中すると、クールダウンが{Constants.E.cooldown_reduction}秒減少します。<br />
        <br />
        ユミンが指定した方向に素早く移動し、{Constants.E.duration}秒間継続する風雲地帯を生成します。<br />
        移動した後、周りにいる敵3人に風を飛ばして<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えます。
    </>
);

export default e;

export const values: ValuesProps = {
    additionalInfo: <>クールダウン固定：クールダウン減少系ステータスの影響を受けません。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown.constant},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}