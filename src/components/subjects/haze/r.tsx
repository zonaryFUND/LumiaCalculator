import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>ロケットランチャーに武器切り替え</span>：ウェポンケースを振り回して敵の移動速度を{Constants.R.slow.duration}秒間{Constants.R.slow.effect}%減少させながら
            <Value skill="R" ratio={Constants.R.switch_damage} />のスキルダメージを与え、{Constants.R.duration}秒間{Constants.R.ammo}発弾倉のロケットランチャーに切り替えます。<br />
            <br />
            ロケットランチャー状態では射程距離と攻撃速度が固定され、移動速度が{Constants.R.movement_speed_penalty}減少します。また、基本攻撃に致命打が適用されません。的中した敵の後方に
            <Value skill="R" ratio={Constants.R.area_damage} />の範囲スキルダメージを追加で与えます。ロケットランチャー状態を維持する間、
            <span className={style.emphasis}>40mmグレネード</span>スキルが<span className={style.emphasis}>加速ロケット</span>スキルに変更されます。<br />
            <br />
            ロケットランチャー状態が終了すると、余った弾の数に比例してクールダウンが最大{Constants.R.max_cooldown_reduction}%減少します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <>
        <span className={style.emphasis}>ロケットランチャー</span>を使用し、直前まで使用していた武器が解除されます。<br />
        射程距離は{Constants.R.basic_attack_range}、攻撃速度は{Constants.R.attack_speed}に固定され、移動速度が{Constants.R.movement_speed_penalty}
        減少して視界が{Constants.R.vision}増加します。<br />
        <span className={style.emphasis}>ロケットランチャー状態</span>は弾倉がすべて消費されるか、持続時間が終了されるか、他の銃器を使用すると解除されます。
    </>,
    parameters: [
        {title: "振り回しダメージ量", values: Constants.R.switch_damage.base},
        {title: "ロケットダメージ量", values: Constants.R.area_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
