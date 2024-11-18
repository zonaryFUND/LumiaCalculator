import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const lyanhr: React.FC<SubjectSkillProps> = props => {
    const { showEquation } = useValueContext();

    const attackSpeed = (() => {
        if (showEquation) {
            return <>
                <span className={style.emphasis}>{Constants.LyAnhR.attack_speed.base[props.skillLevel]}%</span>
                <span className={style.attack}>(+攻撃力の{Constants.LyAnhR.attack_speed.attack}%)</span>
            </>
        } else {
            return <>
                <Value skill="D" ratio={Constants.LyAnhR.attack_speed} />
                <span className={style.emphasis}>%</span>
            </>;
        }
    })();

    return (
        <>
            <span className={style.level}>使用条件</span>憑依状態で侵食が100以上の時に使用できます。悪霊状態では毎秒侵食が
            {Constants.LyAnhR.thrash_decline}ずつ減少します。スキルをキャストした位置を基準に
            {Constants.LyAnhR.range}以内でのみ悪霊状態が維持されます。<br />
            <br />
            イアンが悪霊に完全に侵食されます。指定した方向に悪霊が飛び出て<Value skill="R" ratio={Constants.LyAnhR.damage} />
            のスキルダメージを与え、イアンの本体はキャストした位置に残ります。悪霊状態では最大体力が
            <span className={style.emphasis}>{Constants.LyAnhR.maxhp[props.skillLevel]}</span>増加し、移動速度が
            <span className={style.emphasis}>{Constants.LyAnhR.movement_speed}%</span>、攻撃速度が{attackSpeed}増加します。基本攻撃する時、敵に
            <Value skill="R" ratio={Constants.LyAnhR.attack_damage} />
            のスキルダメージを与え、{Constants.LyAnhR.fear_count}回目の基本攻撃は敵を{Constants.LyAnhR.fear[props.skillLevel]}秒間恐怖状態にさせます。対象の周り
            {Constants.LyAnhR.fear_range}m範囲内にいる敵も同じく恐怖状態になります。<br />
            <br />
            スキル終了後、悪霊が消えていない場合、その場で人間状態になります。悪霊が消えた場合、スキルを使用したときに分離されたイアンの本体の方が体力
            <span className={style.emphasis}>{Constants.LyAnhR.hp_on_death[props.skillLevel]}</span>の状態で人間状態に戻ります。< br />
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
        {title: "攻撃速度増加量(%)", values: Constants.LyAnhR.attack_speed.base, percent: true},
        {title: "恐怖持続時間", values: Constants.LyAnhR.fear},
        {title: "死亡時体力保有量", values: Constants.LyAnhR.hp_on_death},
        {title: "クールダウン", values: Constants.LyAnhR.cooldown}
    ]
}
