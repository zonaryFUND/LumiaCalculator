import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ヘジンが5つの霊符を召喚して周りの敵に<Value skill="R" ratio={Constants.R.first_damage} />のスキルダメージを与えます。<br />
            霊符は{Constants.R.duration}秒間ヘジンの周辺を回り、衝突した敵にそれぞれ<Value skill="R" ratio={Constants.R.card_damage} />のスキルダメージを与えた後に消えます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <>
        キャスト中には移動速度が{Constants.R.movement_speed_penalty}%減少します。<br />
        実験体及びボスモンスターにのみ的中します。
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.R.first_damage.base},
        {title: "札ダメージ量", values: Constants.R.card_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
