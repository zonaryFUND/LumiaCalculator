import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        デビーとマーリンが両端から突進し、経路上にいるすべての敵に<Value skill="R" ratio={Constants.R.damage} />
        のスキルダメージを与えた後、自分の方に敵を引き寄せてしばらくの間気絶させ、<Value skill="R" ratio={Constants.R.second_damage}  />
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
