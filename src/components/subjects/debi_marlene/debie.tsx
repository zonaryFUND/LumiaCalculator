import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：デビーとマーリンはお互いに交替する時、移動速度が
        {Constants.E.movement_speed.effect}%増加し、{Constants.E.movement_speed.duration}秒にわたって元に戻ります。<br />
        <br />
        マーリンを呼んで交替します。交替する時、マーリンが後ろに移動してエネルギーを放出 し、最初に的中した敵に
        <Value skill="E" ratio={Constants.DebiE.damage} />のスキルダメージを与えます。また、
        {Constants.DebiE.slow_after}秒後、最初に的中した敵と周りのすべての敵の移動速度を
        {Constants.DebiE.slow.duration}秒間{Constants.DebiE.slow.effect}%減少させます。<br />
        <br />
        デビー{Constants.DebiE.debi_remain}秒間交替した位置で待機し、<span className={style.emphasis}>クレセントスラッシュ</span>
        を使用するとデビーが前方に突進して経路上の敵に<Value skill="E" ratio={Constants.DebiE.second_damage} />
        のスキルダメージを与えて{Constants.DebiE.airborne}秒間空中に浮かせます。
    </>
);

export default e;

export const values: ValuesProps = {
    additionalInfo: <>
        このスキルは基本攻撃及びスキル攻撃判定と見なされ、最初に的中した敵に的中した場合に効果が発動します。<br />
        クールダウン減少効果の影響を受けず、追加攻撃速度に比例してキャスト時間が減少します。
    </>,
    parameters: [
        {title: "マーリンのダメージ量", values: Constants.DebiE.damage.base},
        {title: "デビーのダメージ量", values: Constants.DebiE.second_damage.base},
        {title: "クールダウン", values: Constants.DebiE.cooldown.constant}
    ]
}
