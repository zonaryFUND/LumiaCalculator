import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.level}>持続効果</span>：<span className={style.emphasis}>打ち下ろし</span>、
            <span className={style.emphasis}>振り回し</span>、<span className={style.emphasis}>打ち上げ</span>が活性化するたびに[気合]を1つ獲得します。<br />
            非戦闘状態では[気合]が{Constants.R.focus_disappear}秒ごとに1つずつ消えます。<br />
            <br />
            [気合]を1つ消耗してキャストした方向に突進します。貫通させた対象には<Value skill="R" ratio={Constants.R.damage} />のスキルダメージを与えます。実験体に的中した場合、
            {Constants.R.shield_duration}秒間<Value skill="R" ratio={Constants.R.shield} />のダメージを吸収できるシールドを獲得します。<br />
            スキルを使用した後に基本攻撃をすると武器スキルとパニッシャー以外のスキルクールダウンが{Constants.R.cooldown_reduction}秒減少します。[鍛練の成果]を保有している場合、攻撃速度が
            {Constants.R.attack_speed[props.skillLevel]}%増加します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <>シールドが維持される間にスキルが的中しても新しくシールドを獲得しません。シールドの 持続時間のみ更新されます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "攻撃速度増加量(%)", values: Constants.R.attack_speed, percent: true},
        {title: "シールド吸収量", values: Constants.R.shield.base}
    ]
}
