import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ウィルソンが指定した方向へ体を伸ばし、ぶつかった対象を引っ張ってきます。対象がシセラの場合には
            <Damage skill="E" constants={Constants.E.shield} {...props} />のシールドが{Constants.E.shield_duration}
            秒間生成され、対象が敵の場合には<Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを与えて
            {Constants.E.stun}秒間気絶させます。<br />
            <br />
            シセラを引っ張ってくるとクールダウンが{Constants.E.cooldown_reduction}秒減少します。<br />
            対象を引っ張る途中、助けてウィルソン！を使用するとその方向へ移動します。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "シールド吸収量", values: Constants.E.shield.base},
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
