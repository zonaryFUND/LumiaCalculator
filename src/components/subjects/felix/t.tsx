import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => {
    const shield = (() => {
        const duration = Constants.T.shield.duration;
        const base = Constants.T.shield.effect.consumedStack;
        const attack = Constants.T.shield.effect.attack;
        if (props.showEquation) {
            return <>{duration}秒間<span className={style.emphasis}>消耗した1スタックあたり{base}</span><span className={style.attack}>(+攻撃力の{attack}％)</span></>
        } else {
            const zero = props.status.attackPower.percent(attack);
            return <>
                消耗したスタックに比例して{duration}秒間
                <span className={style.emphasis}>{zero.toString()}</span> ~ <span className={style.emphasis}>{zero.add(Constants.T.max_stack * base).toString()}</span>
            </>
        }
    })();

    return (
        <>
            フェリックスは最大射程距離の敵を2回連続で攻撃します。2回目の攻撃は<Damage skill="T" constants={Constants.T.damage} {...props} />の基本攻撃ダメージを与えます。<br />
            <br />
            <span className={style.emphasis}>旋風斬</span>、<span className={style.emphasis}>疾風雷撃</span>、<span className={style.emphasis}>半月斬</span>
            のクールダウンが共有されて{Constants.T.shared_cooldown[props.config.skillLevels.T]}秒になり、最大3回まで連携して使用することができます。<br />
            <br />
            <span className={style.emphasis}>連携攻撃</span>：次のスキルを連携する前に基本攻撃でダメージを与えると、<span className={style.emphasis}>連携攻撃</span>
            のスタックが増加して最大{Constants.T.max_stack}スタックまで獲得できます。3回目の連携の時、<span className={style.emphasis}>連携攻撃</span>
            のスタックを消耗して1スタックあたり{Constants.T.stack_cooldown_reduction}秒の共有クールダウンを減少させ、{shield}のシールドを獲得します。使用した3回目の連携に定められた効果が適用されます。<br />
            <br />
            共有クールダウンはクールダウン減少効果の影響を受けません。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "2打ダメージ量", values: Constants.T.damage.attack, percent: true},
        {title: "共有クールダウン", values: Constants.T.shared_cooldown},
    ]
}
