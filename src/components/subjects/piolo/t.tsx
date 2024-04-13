import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ピオロは非戦闘状態になると[鍛練の成果]スタックを{Constants.T.stack_gain[props.config.skillLevels.T]}獲得します。休憩を{Constants.T.rest}
            秒以上続けた後に終了すると{Constants.T.additional_stack_gain[props.config.skillLevels.T]}スタックを追加で獲得します。[鍛練の成果]を保有している場合、[パニッシャー] スキル使用後、次の基本攻撃が
            <Damage skill="T" constants={Constants.T.damage} {...props} />のスキルダメージを追加で与えます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>
        [鍛練の成果]スタック保有数が非戦闘状態の時に獲得するスタック数より高い場合、スタックを獲得しません。<br />
        追加スキルダメージは最小1のダメージを与えます。
    </>,
    parameters: [
        {title: "[鍛錬の結果]スタック数", values: Constants.T.stack_gain},
        {title: "[鍛錬の結果]スタック追加獲得数", values: Constants.T.additional_stack_gain},
        {title: "合計スキル増幅係数", values: Constants.T.damage.amp}
    ]
}
