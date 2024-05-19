import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        カミロが踊りながら前に移動した後、{Constants.R.return_time}秒後に戻ってきます。<br />
        踊りながら移動する間、妨害効果免疫状態となり、受けるダメージ量が{Constants.R.damage_reduction[props.skillLevel]}%減少します。<br />
        踊りが終わる時、カミロと一度ぶつかった敵は<Value skill="R" ratio={Constants.R.one_hit_damage} />
        のスキルダメージを与えられます。2回ぶつかった敵には<Value skill="R" ratio={Constants.R.two_hit_damage} />
        のスキルダメージを与えて{Constants.R.stun}秒間気絶させます。また、カミロの移動速度がしばらくの間大きく増加して、
        <span className={style.emphasis}>{Constants.R.heal.base[props.skillLevel]}(+敵にぶつかった回数当たり
        {Constants.R.heal.perHit[props.skillLevel]}%、最大{Constants.R.heal.perHit[props.skillLevel] * Constants.R.heal.maxHit}%)</span>
        の体力を回復します。<br />
        {Constants.R.duration}秒以内に最大{Constants.R.reuse}回まで再使用できます。
    </>
)

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "エンベレソ1スタックダメージ量", values: Constants.R.one_hit_damage.base},
        {title: "エンベレソ2スタックダメージ量", values: Constants.R.two_hit_damage.base},
        {title: "体力回復量", values: Constants.R.heal.base},
        {title: "回復増加量", values: Constants.R.heal.perHit, percent: true},
        {title: "受けるダメージ減少(%)", values: Constants.R.damage_reduction},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
