import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import style from "components/tooltip/tooltip.module.styl"
import Value from "components/tooltip/value";
import { useValueContext } from "components/tooltip/value-context";

const {stack, ...healWithoutStack} = Constants.W.finish_heal;

const w: React.FC<SubjectSkillProps> = props => {
    const { showEquation } = useValueContext();

    return (
        <>
            <span className={style.level}>持続効果</span>：ガーネットが<span className={style.emphasis}>我慢</span>以外の基本スキルを使用するたびに<span className={style.emphasis}>[苦痛]</span>スタックを獲得します。ガーネットはスキル終了時に保有していた<span className={style.emphasis}>[苦痛]</span>スタックをすべて消耗し、1スタックごとに<span className={style.emphasis}>押しつぶし＆突き刺し</span>と<span className={style.emphasis}>歪んだ執着</span>のクールダウンが{Constants.W.qe_cooldown_reduction_per_stack}秒ずつ減少します。<br />
            <br />
            チャージ：ガーネットが移動不可状態になって{Constants.W.damage_reduction.duration}秒間受けるダメージが{Constants.W.damage_reduction.effect}%減少し、チャージする間{Constants.W.heal_tick}秒ごとに<Value skill="W" ratio={Constants.W.heal} overrideExpression={{lostHP: {className: style.emphasis}}} />の体力を回復します。<br />
            <br />
            チャージ終了時：範囲内の敵に<Value skill="W" ratio={Constants.W.min_damage} /> ~ <Value skill="W" ratio={Constants.W.max_damage} />のスキルダメージを与え、{Constants.W.slow.duration}秒間移動速度を{Constants.W.slow.effect}%減少させます。<br />
            最大チャージ時には対象を{Constants.W.max_charge_bind}秒間束縛させ、ガーネットは体力を<Value skill="W" ratio={healWithoutStack} /><span className={style.strong}>(+消耗した苦痛スタック1あたり{stack[props.skillLevel]})</span>回復します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "最小ダメージ量", values: Constants.W.min_damage.base},
        {title: "最大ダメージ量", values: Constants.W.max_damage.base},
        {title: "体力回復量", values: Constants.W.finish_heal.base},
        {title: "苦痛スタック比例回復量", values: Constants.W.finish_heal.stack},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}
