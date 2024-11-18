import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const dict = {
    summonedAttack: {
        format: "セントリーガンの攻撃力の{ratio}%"
    }
}

const w: React.FC<SubjectSkillProps> = props => (
    <>
        バーバラが高出力砲でイオンレーザーを発射し、経路上の敵に<Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与えます。<br />
        敵に的中すると、{Constants.W.movement_speed.duration}秒間移動速度が{Constants.W.movement_speed.effect}
        %増加します。増加した移動速度は{Constants.W.movement_speed.duration}秒にわたって徐々に元に戻ります。
    </>
)

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}