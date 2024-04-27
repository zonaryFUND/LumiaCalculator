import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            フィオラが指定した方向に短く突進しながら攻撃し、<Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを与えて
            {Constants.R.slow.duration}秒間敵の移動速度を{Constants.R.slow.effect}％減少させます。<br />
            フレッシュは最大2回追加で使用することができます。<br />
            <br />
            最後に使用する時は<Damage skill="R" constants={Constants.R.finish_damage} {...props} />のスキルダメージを与えて敵を
            {Constants.R.stun}秒間気絶させます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <>
        このスキルは壁を越えられません。<br />
        敵との距離が近い場合にはその場で動かずにスキルを使用します。
    </>,
    parameters: [
        {title: "[フレッシュ]1、2回目のダメージ量", values: Constants.R.damage.base},
        {title: "[フレッシュ]3回目のダメージ量", values: Constants.R.finish_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
