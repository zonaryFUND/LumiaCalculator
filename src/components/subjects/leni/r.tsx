import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レニがスプリングトラップを設置します。<br />
            敵に的中させた場合には<Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを与え、指定した方向に敵を跳ね飛ばします。<br />
            飛ばされた敵が壁にぶつかった場合、敵の移動速度が{Constants.R.slow.duration}秒間{Constants.R.slow.effect}％減少します。<br />
            <br />
            スプリングトラップはレニも利用できます!
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは壁を越えられません。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
