import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            {Constants.R.cast}秒間キャストすると、{Constants.R.blast}秒後に半径{Constants.R.range}
            m以内にいる敵実験体とシセラ自分自身に<Value skill="R" ratio={Constants.R.damage} />のスキルダメージを与えます。<br />
            シセラが体力を1%失う度に、{Constants.R.lost_hp_conversion[props.skillLevel]}の追加ダメージを与えます。<br />
            シセラは解放によるダメージを受けても体力が{Constants.R.min_hp}以下になりません。<br />
            ダメージを与えた後、{Constants.R.passive_enhance_duration[props.skillLevel]}秒間パッシブスキルの効果が{Constants.R.passive_enhance}%増加します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <>スキルを使用できなかった場合、クールダウンが{Constants.R.cooldown_return}%返されます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "失った体力対比ダメージ量", values: Constants.R.lost_hp_conversion},
        {title: "パッシブ強化持続時間", values: Constants.R.passive_enhance_duration},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}
