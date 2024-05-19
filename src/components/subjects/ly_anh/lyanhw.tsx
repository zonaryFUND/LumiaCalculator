import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const lyanhw: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.enhance}>人間状態</span>：悪霊がイアンを操ります。短剣を振り回させて
            <Value skill="W" ratio={Constants.LyAnhW.damage} />のスキルダメージを与えます。的中された対象は移動速度が
            {Constants.LyAnhW.slow.effect}%減少します。減少させた移動速度は{Constants.LyAnhW.slow.duration}秒にわたって徐々に元に戻ります。<br />
            <br />
            <span className={style.enhance}>憑依状態</span>：憑依されたイアンが前方に悪霊の手で
            <Value skill="W" ratio={Constants.GhostW.damage} />のスキルダメージを与えます。スキルが的中した場合、
            <span className={style.emphasis}>[蝕み]</span>スタックを獲得し、移動速度が{Constants.GhostW.movement_speed.effect}
            %増加します。増加した移動速度は{Constants.GhostW.movement_speed.duration}
            秒にわたって徐々に元に戻ります。スタック数に応じてスキルを使用する時に消耗される体力が増加し、的中した場合、
            <span className={style.emphasis}>締め付ける指先</span>と
            <span className={style.emphasis}>切り裂く手</span>のクールダウンがスタックあたり
            {Constants.GhostW.qe_cooldown_reduction}秒減少します。最大{Constants.GhostW.max_stack}スタックまで獲得できます。
        </>
    );
}

export default lyanhw;

export const values: ValuesProps = {
    additionalInfo: <>スキルを使用すると、[侵食]を{Constants.LyAnhW.thrash}獲得します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.LyAnhW.damage.base},
        {title: "[血まみれの爪]ダメージ量", values: Constants.GhostW.damage.base},
        {title: "クールダウン", values: Constants.LyAnhW.cooldown}
    ]
}
