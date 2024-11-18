import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            プリヤがサラスバティの花のために演奏しながら範囲内の敵に<Value skill="Q" ratio={Constants.Q.damage} />
            のスキルダメージを与えてサラスバティの花を生成します。すでに効果範囲内にサラスバティの花がある場合は生成されず、満開効果を発動させるとチャージ時間が{Constants.Q.charge_reduction}%減少します。<br />
            <br />
            <span className={style.emphasis}>満開効果</span>：満開のサラスバティの花をスキルで的中させると、花びらが舞い散り、範囲内の敵に
            <Value skill="Q" ratio={Constants.Q.bloomed_damage} />のスキルダメージを与えて突き飛ばします。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "満開ダメージ量", values: Constants.Q.bloomed_damage.base},
        {title: "消費", values: Constants.Q.sp_cost},
        {title: "チャージ時間", values: Constants.Q.charge.time}
    ]
}
