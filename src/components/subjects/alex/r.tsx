import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        アレックスが指定した位置に衛星ミサイルを誘導して範囲内の敵に
        <Damage skill="R" constants={Constants.R.first_damage.outer} {...props} />のスキルダメージを与え、
        中心部の敵には<Damage skill="R" constants={Constants.R.first_damage.center} {...props} />のスキルダメージを与えます。
        的中した対象の移動速度を{Constants.R.first_slow.duration}秒間{Constants.R.first_slow.effect}減少させます。<br />
        その後、周期的にパルスを放出して{Constants.R.later_damage.tick}秒ごとに
        <Damage skill="R" constants={Constants.R.later_damage.outer} {...props} />の
        スキルダメージを{Constants.R.later_damage.amount}回与え、
        中心部の敵には<Damage skill="R" constants={Constants.R.later_damage.center} {...props} />の
        スキルダメージを与えて{Constants.R.later_slow.duration}秒間移動速度を{Constants.R.later_slow.effect}減少させます。
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