import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ハートがギターを弾くと音符が生成されます。以降スキルを再度使用することができます。<br />
            <br />
            再使用：指定した方向に音符を飛ばして
            <Damage skill="Q" constants={Constants.Q.min_damage} {...props} /> ~ <Damage skill="Q" constants={Constants.Q.max_damage} {...props} />
            のスキルダメージを与えます。{Constants.Q.charge_threshold}秒以上待機した後に使用するとダメージ量が最大ダメージ量に到達します。<br />
            <br />
            <span className={style.strong}>進化効果</span>：スキルの再使用回数が増加します。音符に
            {Constants.Q.slow_threshold}回的中した敵は移動速度が{Constants.Q.slow.duration}
            秒間{Constants.Q.slow.effect}％減少します。
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
