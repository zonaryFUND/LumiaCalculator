import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Damage from "../damage";
import { skillLevel } from "../skill-damage";
import style from "components/tooltip/tooltip.module.styl";

const dagger: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);

    return (
        <>
            <span className={style.emphasis}>マント</span><br />
            スキルを使用すると{Constants.dagger.cloak.duration[level]}秒間透明になり、移動速度が{Constants.dagger.cloak.movement_speed}
            ％増加します。増加した移動速度は{Constants.dagger.cloak.duration[level]}秒に渡って減少します。<br />
            <br />
            <span className={style.emphasis}>短剣</span><br />
            指定した敵の後ろに移動して<Damage skill="D" constants={Constants.dagger.dagger.damage} {...props} />
            のスキルダメージと、対象の現在体力{Constants.dagger.dagger.true_damage.targetHP}％だけの固定ダメージを与え、
            {Constants.dagger.dagger.slow.duration}秒間移動速度を{Constants.dagger.dagger.slow.effect[level]}％減少させます。
        </>
    );
}

export default dagger;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.dagger.dagger.damage.base},
        {title: "維持時間", values: Constants.dagger.cloak.duration},
        {title: "移動速度減少量(％)", values: Constants.dagger.dagger.slow.effect, percent: true},
        {title: "クールダウン", values: Constants.dagger.cooldown},
    ]
}