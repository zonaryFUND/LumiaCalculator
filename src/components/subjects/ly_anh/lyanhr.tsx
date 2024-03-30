import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const lyanhr: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.level}>使用条件</span>憑依状態で侵食が100以上の時に使用できます。悪霊状態では毎秒侵食が
            {Constants.LyAnhR.thrash_decline}ずつ減少します。スキルをキャストした位置を基準に
            {Constants.LyAnhR.range}以内でのみ悪霊状態が維持されます。<br />
            <br />
            イアンが悪霊に完全に侵食されます。指定した方向に悪霊が飛び出て<Damage skill="R" constants={Constants.LyAnhR.damage} {...props} />
            のスキルダメージを与え、イアンの本体はキャストした位置に残ります。悪霊状態では最大体力が
            <span className={style.emphasis}>{Constants.LyAnhR.maxhp[props.config.skillLevels.R]}</span>増加し、移動速度が
            <span className={style.emphasis}>{Constants.LyAnhR.movement_speed}％</span>増加します。基本攻撃する時、敵に
            <Damage skill="R" constants={Constants.LyAnhR.attack_damage} {...props} />
            のスキルダメージを与えてイアンが[殺戮本能]スタックを獲得します。スタック1あたり攻撃速度が
            {Constants.LyAnhR.attack_speed[props.config.skillLevels.R]}ずつ増加し、最大{Constants.LyAnhR.max_stack}スタックまで獲得できます。<br />
            {Constants.LyAnhR.fear_count}回目の基本攻撃は対象を{Constants.LyAnhR.fear[props.config.skillLevels.R]}秒間恐怖に陥れます。対象の周り
            {Constants.LyAnhR.fear_range}m範囲内にいる敵も同じく恐怖状態になります。<br />
            <br />
            スキル終了後、悪霊が消えていない場合、その場で人間状態になります。悪霊が消えた場合、スキルを使用したときに分離されたイアンの本体の方が体力
            <span className={style.emphasis}>{Constants.LyAnhR.hp_on_death[props.config.skillLevels.R]}</span>の状態で人間状態に戻ります。< br />
            <br />
            <span className={style.emphasis}>スキル終了時点</span>
            ：イアンを中心に指定された範囲から離れる時・スキルを再度使用する時・悪霊が消えた時・[蝕み]スタック数が0になった時
        </>
    );
}

export default lyanhr;

export const values: ValuesProps = {
    additionalInfo: <>禁止区域ではすぐに死亡します。<br />恐怖状態になった対象は{Constants.LyAnhR.fear_immune}秒間恐怖スタックを獲得しません。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.LyAnhR.damage.base},
        {title: "最大体力増加量", values: Constants.LyAnhR.maxhp},
        {title: "攻撃速度増加量(％)", values: Constants.LyAnhR.attack_speed, percent: true},
        {title: "恐怖持続時間", values: Constants.LyAnhR.fear},
        {title: "死亡時体力保有量", values: Constants.LyAnhR.hp_on_death},
        {title: "クールダウン", values: Constants.LyAnhR.cooldown}
    ]
}
