import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const maxDamage = {
    base: Constants.R.damage.base.map(v => v * 2),
    attack: Constants.R.damage.attack * 2
}

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ルクが掃除道具から貫通型の銃弾を発射し、敵の失った体力に応じて
            <Damage skill="R" constants={Constants.R.damage} {...props} /> ~ <Damage skill="R" constants={maxDamage} {...props} />のスキルダメージを与え、
            {Constants.R.slow.duration}秒間{Constants.R.slow.effect[props.config.skillLevels.R]}%の移動速度を減少させます。ルクは敵の視界を獲得して後方に突き飛ばされます。<br />
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
