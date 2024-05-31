import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            彰一が鞄を振り回して範囲内の敵に<Value skill="R" ratio={Constants.R.damage} />のスキルダメージを与え、
            {Constants.R.slow.duration}秒間{Constants.R.slow.effect}%の移動速度を減少させます。<br />
            鞄を振り回す時、四方に4つの短剣を設置して経路上の敵に<Value skill="R" ratio={Constants.R.knife_damage} />のスキルダメージを与えます。
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
