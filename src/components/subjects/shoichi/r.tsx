import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            彰一が鞄を振り回して範囲内の敵に<Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを与え、
            {Constants.R.slow.duration}秒間{Constants.R.slow.effect}％の移動速度を減少させます。<br />
            鞄を振り回す時、四方に4つの短剣を設置して経路上の敵に<Damage skill="R" constants={Constants.R.knife_damage} {...props} />のスキルダメージを与えます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "短剣被害量", values: Constants.R.knife_damage.base}
    ]
}
