import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            エレナが指定した範囲に<span className={style.emphasis}>氷床地帯</span>を生成します。内側の範囲に的中した敵に<Damage skill="R" constants={Constants.R.center_damage} {...props} />
            のスキルダメージを与え、敵はわき出た氷によってすぐに気絶し、<span className={style.emphasis}>氷結</span>状態になります。
            <span className={style.emphasis}>氷床地帯</span>に触れた敵は<Damage skill="R" constants={Constants.R.outer_damage} {...props} />
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
