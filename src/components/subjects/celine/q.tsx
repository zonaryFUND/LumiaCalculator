import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        プラズマ爆弾を投げて指定した位置に設置します。<span className={style.emphasis}>起爆</span>
        スキルで爆弾を爆発させると、それぞれの範囲に<Value skill="Q" ratio={Constants.Q.damage} />
        のスキルダメージを与えます。対象が1つ以上の爆弾にダメージを受けた場合、2つ目からのダメージ量は{Constants.Q.multiple_bomb_damage_multiplier}
        ％のみ適用されます。<br />
        <br />
        プラズマ爆弾は最大{Constants.Q.max_bomb}つまで設置することができ、最大{Constants.Q.charge.max}つの爆弾を貯めておくことができます。<br />
        <br />
        爆発したり、時間が過ぎた爆弾の場合、空の爆弾になり、<span className={style.emphasis}>磁力融合</span>スキルで活用することができます。
    </>
)

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "消費", values: Constants.Q.sp_cost},
        {title: "チャージ時間", values: Constants.Q.charge.time.constant}
    ]
}