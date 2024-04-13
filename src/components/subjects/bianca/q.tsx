import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        ビアンカが指定した地点に血の槍を投げて衝突した対象に<Damage skill="Q" constants={Constants.Q.first_damage} {...props} />
        のスキルダメージを与えます。血の槍は到着位置で円形に広がって衝突する敵一人に<Damage skill="Q" constants={Constants.Q.second_damage} {...props} />
        のスキルダメージを与えてから消えます。<span className={style.emphasis}>血流減速</span>の対象が<span className={style.emphasis}>鮮血の投槍</span>によってダメージを受けると
        {Constants.Q.bind}秒間束縛されます。
    </>
)

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.first_damage.base},
        {title: "追加ダメージ量", values: Constants.Q.second_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}