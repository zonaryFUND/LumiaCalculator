import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        ティアが<span className={style.emphasis}>ブラシストローク(Q)</span>または<span className={style.emphasis}>カラーリング(E)</span>
        で敵に2色を塗るとリス効果が発動します。ティアの基本スキルはクールダウン減少オプションに影響されず、クールダウン減少才プション10%あたりスキル増幅が
        {Constants.T.cooldown_conversion}増加します。<br />
        <br />
        <span className={style.enhance}>怒りのリス</span>：敵に<span className={style.emphasis}>黄色と赤色</span>
        を塗ると怒りのリス効果が発動して、敵に<Value skill="T" ratio={Constants.T.yr.damage} />
        のスキルダメージを{Constants.T.yr.duration}秒間{Constants.T.yr.count}回に分けて与え、敵を沈黙状態にさせます。<br />
        <br />
        <span className={style.enhance}>祝福のリス</span>：敵に<span className={style.emphasis}>赤色と青色</span>
        を塗ると祝福のリス効果が発動して、ティアが与えたダメージ量の{Constants.T.rb.heal}%の体力を回復し、
        {Constants.T.rb.movement_speed.duration}秒間移動速度が{Constants.T.rb.movement_speed.effect[props.skillLevel]}%増加した後、徐々に減少します。敵に
        <Value skill="T" ratio={Constants.T.rb.damage} />のスキルダメージを与えます。<br />
        <br />
        <span className={style.enhance}>魔法のリス</span>：敵に<span className={style.emphasis}>青色と黄色</span>
        を塗ると魔法のリス効果が発動して、敵に<Value skill="T" ratio={Constants.T.by.damage} />のスキルダメージを与えて
        {Constants.T.by.bind}秒間敵を束縛させます。
    </>
)

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "[怒りのリス]一定時間毎のスキルダメージ", values: Constants.T.yr.damage.base},
        {title: "[祝福のリス]スキルダメージ", values: Constants.T.rb.damage.base},
        {title: "[祝福のリス]移動速度増加", values: Constants.T.rb.movement_speed.effect, percent: true},
        {title: "[魔法のリス]スキルダメージ", values: Constants.T.by.damage.base}
    ]
}