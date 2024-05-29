import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import { useValueContext } from "components/tooltip/value-context";
import style from "components/tooltip/tooltip.module.styl";

const w: React.FC<SubjectSkillProps> = props => {
    const { status, showEquation } = useValueContext();
    const count = (() => {
        if (showEquation) {
            return <>
                <span className={style.emphasis}>{Constants.W.count}</span>
                <span className={style.defense}>(+追加防御力{Constants.W.additional_hit_per__additional_defense}あたり1)</span>
            </> 
        } else {
            const additional = status.defense.additional?.dividedBy(Constants.W.additional_hit_per__additional_defense).floor();
            return <span className={style.emphasis}>{additional?.add(Constants.W.count).toString()}</span>
        }
    })();

    return (
        <>
            マグヌスが武器を振り回しながら{Constants.W.duration}秒間<Value skill="W" ratio={Constants.W.damage} />のスキルダメージを
            {count}回与えます。<br />
            <br />
            スキルが的中するたびにクールダウンが{Constants.W.cooldown_reduction}秒減少します。スキル使用中には妨害耐性が{Constants.W.tenacity}%増加します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
