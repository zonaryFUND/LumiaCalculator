import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const healMax = {
    base: Constants.RE.heal.base.map(v => v * Constants.RE.heal_max_multiplier),
    amp: Constants.RE.heal.amp * Constants.RE.heal_max_multiplier
}

const re: React.FC<SubjectSkillProps> = props => (
    <>
        スアが武器をランスに変えます。その後、前方に突進して始めて的中した敵に<Value skill="R" ratio={Constants.RE.damage} />
        のスキルダメージを与えて{Constants.RE.slow.duration}秒間移動速度を{Constants.RE.slow.effect}%減少させます。<br />
        栞が残った状態の敵には<Value skill="R" ratio={Constants.RE.bookmark_damage} />のスキルダメージを与えて空中に浮かせます。<br />
        スアはドン・キホーテを的中させた場合、失った体力に比例して
        <Value skill="R" ratio={Constants.RE.heal} /> ~ <Value skill="R" ratio={healMax} />
        の体力を回復します。<br />
        敵に的中させた場合、ドン・キホーテのクールダウンが{Constants.RE.cooldown_reduction}%減少します。<br />
        スアが武器を変更する間には妨害効果免疫状態になります。
    </>
);

export default re;

export const values: ValuesProps = {
    additionalInfo: <>スアの体力が{Constants.RE.heal_max_hp}%の場合、最大回復量が適用されます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.RE.damage.base},
        {title: "体力回復量", values: Constants.RE.heal.base},
        {title: "強化されたダメージ量", values: Constants.RE.bookmark_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}