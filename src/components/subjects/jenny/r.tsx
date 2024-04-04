import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        ジェニーの周りに授賞式ステージを設置して、範囲内の敵の移動速度を
        {Constants.R.slow[props.config.skillLevels.R]}％減少させ、ペルソナのクールダウンが初期化されます。<br />
        ステージは{Constants.R.duration}秒後に消え、範囲内の敵に<Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを与え、
        {Constants.R.charm}秒間敵を魅惑させます。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "移動速度減少量(％)", values: Constants.R.slow, percent: true},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost},
    ]
}