import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マイが指定した敵実験体、味方、野生動物、カメラに素早く移動して、自分に{Constants.E.shield_duration}秒間持続するシールドを生成します。対象が味方である場合、味方にも同じシールドを生成します。<br />
            敵実験体に移動：<Value skill="E" ratio={Constants.E.shield} /><br />
            味方・野生動物・カメラに移動：<Value skill="E" ratio={Constants.E.shield} /><br />
            <br />
            <span className={style.emphasis}>スキル再使用</span>：方向を指定してスキルを使用するとマイが素早く移動し、経路上の敵に
            <Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えて{Constants.E.taunt[props.skillLevel]}秒間挑発します。この場合、
            {Constants.E.reuse}秒以内に使用しなければなりません。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "シールド吸収量", values: Constants.E.shield.base},
        {title: "挑発時間", values: Constants.E.taunt},
        {title: "消費", values: Constants.E.sp_cost},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}
