import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ラウラは1m移動するたびに{Constants.T.thril}のスリルを回復します。<br />
            <br />
            <span className={style.emphasis}>ネレアの教え</span>：ラウラは{Constants.T.threshold}m移動するたびに次の基本攻撃が
            <Value skill="T" ratio={Constants.T.damage} />の追加範囲スキルダメージを与えます。スキルで移動するとすぐに活性化します。<br />
            攻撃対象が{Constants.T.unavailable_range}m以内にいると発動しません。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base}
    ]
}
