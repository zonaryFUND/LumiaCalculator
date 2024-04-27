import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ヘジンが5つの霊符を召喚して周りの敵に<Damage skill="R" constants={Constants.R.first_damage} {...props} />のスキルダメージを与えます。<br />
            霊符は{Constants.R.duration}秒間ヘジンの周辺を回り、衝突した敵にそれぞれ<Damage skill="R" constants={Constants.R.card_damage} {...props} />のスキルダメージを与えた後に消えます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <>キャスト中には移動速度が{Constants.R.movement_speed_penalty}％減少します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.R.first_damage.base},
        {title: "札ダメージ量", values: Constants.R.card_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
