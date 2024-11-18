import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        ザヒルが指定した方向へチャクラムを降り注ぎます。最初は<Value skill="R" ratio={Constants.R.first_damage} />
        のスキルダメージを与え、{Constants.R.tick}秒毎に<Value skill="R" ratio={Constants.R.second_damage} />のスキルダメージを与えます。<br />
        <br />
        敵に死神の目刻印がない場合は死神の目を付与します。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.first_damage.base},
        {title: "持続ダメージ量", values: Constants.R.second_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}