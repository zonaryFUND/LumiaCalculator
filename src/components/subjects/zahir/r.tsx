import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        ザヒルが指定した方向へチャクラムを降り注ぎます。最初は<Damage skill="R" constants={Constants.R.first_damage} {...props} />
        のスキルダメージを与え、{Constants.R.tick}秒毎に<Damage skill="R" constants={Constants.R.second_damage} {...props} />のスキルダメージを与えます。<br />
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