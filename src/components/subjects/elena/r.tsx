import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            エレナが指定した範囲に<span className={style.emphasis}>氷床地帯</span>を生成します。内側の範囲に的中した敵に
            <Value skill="R" ratio={Constants.R.center_damage} />
            のスキルダメージを与え、敵はわき出た氷によってすぐに気絶し、<span className={style.emphasis}>氷結</span>状態になります。
            <span className={style.emphasis}>氷床地帯</span>に触れた敵は<Value skill="R" ratio={Constants.R.outer_damage} />
            のスキルダメージを受けます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.outer_damage.base},
        {title: "氷柱ダメージ量", values: Constants.R.center_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
