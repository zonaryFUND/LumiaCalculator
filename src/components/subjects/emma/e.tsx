import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.level}>持続効果</span>：エマはスタミナを消耗するたびに、消費したスタミナの
            {Constants.E.heal[props.skillLevel]}%だけ体力を回復します。<br />
            <br />
            エマが指定した敵にマジックビームを飛ばして敵を{Constants.E.morph[props.skillLevel]}
            秒間移動以外の他の行動ができない兔に変身させ、<Value skill="E" ratio={Constants.E.damage} />
            のスキルダメージを与えます。<br />
            兔になった対象は移動速度が{Constants.E.movement_speed}減少します。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <>瀕死状態の敵にはスキルを使用できません。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "スタミナ消費量の比率(%)", values: Constants.E.heal},
        {title: "維持時間", values: Constants.E.morph}
    ]
}
