import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ラウラは1m移動するたびに{Constants.T.thril}のスリルを回復します。<br />
            <br />
            <span className={style.emphasis}>ネレアの教え</span>：ラウラは{Constants.T.threshold}m移動するたびに次の基本攻撃が
            <Damage skill="T" constants={Constants.T.damage} {...props} />の追加範囲スキルダメージを与えます。スキルで移動するとすぐに活性化します。<br />
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
