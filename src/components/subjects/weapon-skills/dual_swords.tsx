import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Value from "components/tooltip/value";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const dualSword: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            スキルを使用すると指定した方向へ突進し、経路上のすべての敵に<Value skill="D" ratio={Constants.dual_swords.first_damage} />
            のスキルダメージを{Constants.dual_swords.first_count}回与えます。<br />
            突進しながら敵に攻撃を{Constants.dual_swords.threshold}回成功すると{Constants.dual_swords.reuse}
            秒以内にもう一度スキルを使用できます。<br />
            スキルを再使用すると指定した方向へ突進しながら経路上のすべての敵に
            <Value skill="D" ratio={Constants.dual_swords.second_damage} />のスキルダメージを与えます。
        </>
    );
}

export default dualSword;

export const values: ValuesProps = {
    additionalInfo: <>
        このスキルは壁を越えられません。
    </>,
    parameters: [
        {title: "1打ダメージ量", values: Constants.dual_swords.first_damage.base},
        {title: "2打ダメージ量", values: Constants.dual_swords.second_damage.base},
        {title: "クールダウン", values: Constants.dual_swords.cooldown},
        {title: "双剣乱舞第1式追加攻撃力係数", values: Constants.dual_swords.first_damage.additionalAttack, percent: true},
        {title: "双剣乱舞第1式スキル増幅係数", values: Constants.dual_swords.first_damage.amp, percent: true},
        {title: "双剣乱舞第2式追加攻撃力係数", values: Constants.dual_swords.second_damage.additionalAttack, percent: true},
        {title: "双剣乱舞第2式スキル増幅係数", values: Constants.dual_swords.second_damage.amp, percent: true},
    ]
}