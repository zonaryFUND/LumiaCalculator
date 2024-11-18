import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import Value from "components/tooltip/value";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const dagger: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>マント</span><br />
            スキルを使用すると{Constants.onehandsword.cloak.duration[props.skillLevel]}秒間透明になり、移動速度が{Constants.onehandsword.cloak.movement_speed}
            %増加します。増加した移動速度は{Constants.onehandsword.cloak.duration[props.skillLevel]}秒に渡って減少します。<br />
            <br />
            <span className={style.emphasis}>短剣</span><br />
            指定した敵の後ろに移動して<Value skill="D" ratio={Constants.onehandsword.dagger.damage} />
            のスキルダメージと、対象の現在体力{Constants.onehandsword.dagger.true_damage.targetHP}%だけの固定ダメージを与え、
            {Constants.onehandsword.dagger.slow.duration}秒間移動速度を{Constants.onehandsword.dagger.slow.effect[props.skillLevel]}%減少させます。
        </>
    );
}

export default dagger;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.onehandsword.dagger.damage.base},
        {title: "維持時間", values: Constants.onehandsword.cloak.duration},
        {title: "移動速度減少量(%)", values: Constants.onehandsword.dagger.slow.effect, percent: true},
        {title: "クールダウン", values: Constants.onehandsword.cooldown},
    ]
}