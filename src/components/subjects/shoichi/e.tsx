import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            彰一が後ろに下がりながら前方に短剣をなげ、的中した敵に<Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを与えて
            {Constants.E.slow.duration}秒間移動速度を{Constants.E.slow.effect[props.config.skillLevels.E]}%減少させます。的中した敵には
            {Constants.E.duration}秒間協商刻印を付与し、敵の後ろ側に短剣が生成されます。刻印対象は投げた短剣で受けるダメージが
            {Constants.E.damage_increase}%増加し、短剣が的中するたびにクールダウンが{Constants.E.cooldown_reduction}秒減少します。<br />
            <br />
            刻印対象が死亡するとスキルのクールダウンが{Constants.E.kill_cooldown_reduction}%減少します。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "移動速度減少量(%)", values: Constants.E.slow.effect, percent: true}
    ]
}
