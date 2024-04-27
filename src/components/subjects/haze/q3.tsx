import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";
import { values as rawValues } from "./q";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>ロケットランチャー状態</span>：敵を貫通する加速ロケットを発射します。的中した敵に
            <Damage skill="Q" constants={Constants.Q3.damage} {...props} />のスキルダメージを与えて{Constants.Q3.slow.duration}秒間移動速度を
            {Constants.Q3.slow.effect}％減少させ、ダメージの半分を対象の後方に追加で与えます。ロケットは一定時間後に加速して範囲が広くなり、与えるダメージが{Constants.Q3.enhance}％増加します。<br />
            <br />
            このスキルは基本攻撃とクールダウンを共有し、クールダウン減少効果の影響を受けません。
        </>
    );
}

export default q;

const {additionalInfo, ...values} = rawValues;

export { values };