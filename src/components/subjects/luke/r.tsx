import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const maxDamage = {
    base: Constants.R.damage.base.map(v => v * 2),
    attack: Constants.R.damage.attack * 2
}

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ルクが掃除道具から貫通型の銃弾を発射し、敵の失った体力に応じて
            <Value skill="R" ratio={Constants.R.damage} /> ~ <Value skill="R" ratio={maxDamage} />のスキルダメージを与え、
            {Constants.R.slow.duration}秒間{Constants.R.slow.effect[props.skillLevel]}%の移動速度を減少させます。ルクは敵の視界を獲得して後方に突き飛ばされます。<br />
            <br />
            <span className={style.strong}>進化効果</span>：ルクが発射した貫通型銃弾が的中するとクリーニングサービスのクールダウンが初期化します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost},
        {title: "移動速度減少量(%)", values: Constants.R.slow.effect, percent: true}
    ]
}
