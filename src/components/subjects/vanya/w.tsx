import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";
import Decimal from "decimal.js";

const w: React.FC<SubjectSkillProps> = props => {
    //const increasedCooldown = new Decimal(Constants.W.cooldown * Constants.W.cooldown_increase).subPercent(props.status.cooldownReduction).toString();

    return (
        <>
            <span className={style.emphasis}>空色の風</span>：ヴァーニャが空中に浮いて<span className={style.emphasis}>3</span>
            秒間スキルダメージを<Damage skill="W" constants={Constants.W.first_damage} {...props} />ずつ{Constants.W.count}回与えて、移動速度が
            {Constants.W.movement_speed[props.config.skillLevels.W]}%増加した後、徐々に減少します。スキルが終了する前に<span className={style.emphasis}>蝶の嵐</span>を使用できます。<br />
            <br />
            <span className={style.emphasis}>蝶の嵐</span>：空中に高く飛び上がって{Constants.W.untargettable}秒間対象指定不可状態になり、その場に着地しながら
            <Damage skill="W" constants={Constants.W.second_damage} {...props} />のスキルダメージを与えます。使用した場合、スキルクールダウンが<span className={style.emphasis}>{/*increasedCooldown*/}</span>秒増加します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    additionalInfo: <>
        この攻撃では敵が眠りから覚めません。<br />
        追加されるクールダウンはヴァーニャのクールダウン減少能力値の影響を受けます。
    </>,
    parameters: [
        {title: "空色の風ダメージ量", values: Constants.W.first_damage.base},
        {title: "移動速度増加量(%)", values: Constants.W.movement_speed, percent: true},
        {title: "蝶の嵐ダメージ量", values: Constants.W.second_damage.base},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}