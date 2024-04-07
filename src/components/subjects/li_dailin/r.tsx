import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ダイリンが妨害効果免疫状態になって突進し、スキルを発動している{Constants.R.supression}秒間の間ぶつかった敵を制圧し、
            {Constants.R.count}回連続で攻撃します。1打あたり敵の失った体力に比例して
            <Damage skill="R" constants={Constants.R.min_damage} {...props} />
            <span className={style.emphasis}>(+消耗した酔いの50%)</span> ~ <Damage skill="R" constants={Constants.R.max_damage} {...props} />
            <span className={style.emphasis}>(+消耗した酔いの50%)</span>のスキルダメージを与えます。<br />
            <br />
            スキルを使用すると、酔いがすべて消耗され、消耗された酔いに比例してダメージ量が増加します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "最小ダメージ量", values: Constants.R.min_damage.base},
        {title: "最大ダメージ量", values: Constants.R.max_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
