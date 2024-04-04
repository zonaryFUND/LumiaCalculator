import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            シルヴィアが指定した位置にフィニッシュラインを設置し、ラインに触れた敵に<Damage skill="W" constants={Constants.HumanW.damage} {...props} />
            のスキルダメージを与え、移動速度を{Constants.HumanW.slow.duration}秒間{Constants.HumanW.slow.effect}％減少させます。<br />
            移動速度減少効果は最初に当たった時にのみ適用されます。<br />
            <br />
            シルヴィアはスキルを的中させた対象1人あたり{Constants.HumanW.fuel_gain}の燃料を獲得します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.HumanW.damage.base},
        {title: "クールダウン", values: Constants.HumanW.cooldown},
        {title: "消費", values: Constants.HumanW.sp_cost},
    ]
}
