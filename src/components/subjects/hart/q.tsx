import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ハートがギターを弾くと音符が生成されます。音符が生成された後、スキルを2回再使用することができます。<br />
            <br />
            再使用：指定した方向に音符を飛ばして
            <Value skill="Q" ratio={Constants.Q.min_damage} /> ~ <Value skill="Q" ratio={Constants.Q.max_damage} />
            のスキルダメージを与えます。{Constants.Q.charge_threshold}秒以上待機した後に使用するとダメージ量が最大ダメージ量に到達します。<br />
            <br />
            音符に{Constants.Q.slow_threshold}回的中した敵の移動速度を{Constants.Q.slow.duration}
            秒間{Constants.Q.slow.effect}%減少させます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "最小ダメージ量", values: Constants.Q.min_damage.base},
        {title: "最大ダメージ量", values: Constants.Q.max_damage.base}
    ]
}
