import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            {Constants.R.cast}秒間キャストすると、{Constants.R.blast}秒後に半径{Constants.R.range}
            m以内にいる敵実験体とシセラ自分自身に<Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを与えます。<br />
            シセラが体力を1%失う度に、{Constants.R.lost_hp_conversion[props.config.skillLevels.R]}の追加ダメージを与えます。<br />
            シセラは解放によるダメージを受けても体力が{Constants.R.min_hp}以下になりません。<br />
            ダメージを与えた後、{Constants.R.passive_enhance_duration[props.config.skillLevels.R]}秒間パッシブスキルの効果が{Constants.R.passive_enhance}％増加します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <>スキルを使用できなかった場合、クールダウンが{Constants.R.cooldown_return}％返されます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "失った体力対比ダメージ量", values: Constants.R.lost_hp_conversion},
        {title: "パッシブ強化持続時間", values: Constants.R.passive_enhance_duration},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}
