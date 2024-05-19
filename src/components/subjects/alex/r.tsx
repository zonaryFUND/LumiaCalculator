import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        アレックスが指定した位置に衛星ミサイルを誘導して範囲内の敵に
        <Value skill="R" ratio={Constants.R.first_damage.outer} />
        のスキルダメージを与え、中心部の敵には
        <Value skill="R" ratio={Constants.R.first_damage.center} />
        のスキルダメージを与えます。的中した対象の移動速度を
        {Constants.R.first_slow.duration}秒間{Constants.R.first_slow.effect}減少させます。<br />
        その後、周期的にパルスを放出して{Constants.R.later_damage.tick}秒ごとに
        <Value skill="R" ratio={Constants.R.later_damage.outer} />のスキルダメージを
        {Constants.R.later_damage.amount}回与え、中心部の敵には
        <Value skill="R" ratio={Constants.R.later_damage.center} />
        のスキルダメージを与えて{Constants.R.later_slow.duration}秒間移動速度を{Constants.R.later_slow.effect}減少させます。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "最初の外郭ダメージ量", values: Constants.R.first_damage.outer.base},
        {title: "最初の中心部ダメージ量", values: Constants.R.first_damage.center.base},
        {title: "持続外郭ダメージ量", values: Constants.R.later_damage.outer.base},
        {title: "持続中心部ダメージ量", values: Constants.R.later_damage.center.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}