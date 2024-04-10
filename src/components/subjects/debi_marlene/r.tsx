import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        デビーとマーリンが両端から突進し、経路上にいるすべての敵に<Damage skill="R" constants={Constants.R.damage} {...props} />
        のスキルダメージを与えた後、自分の方に敵を引き寄せてしばらくの間気絶させ、<Damage skill="R" constants={Constants.R.second_damage} {...props} />
        の固定ダメージを{Constants.R.second_damage_count}回追加で与えて<span className={style.emphasis}>Blue & Red</span>を刻みます。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "1打ダメージ量", values: Constants.R.damage.base},
        {title: "2打ダメージ量", values: Constants.R.second_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
