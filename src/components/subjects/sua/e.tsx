import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const healMax = {
    base: Constants.E.heal.base.map(v => v * Constants.E.heal_max_multiplier),
    amp: Constants.E.heal.amp * Constants.E.heal_max_multiplier
}

const e: React.FC<SubjectSkillProps> = props => (
    <>
        スアが武器をランスに変えます。その後、前方に突進して始めて的中した敵に<Value skill="E" ratio={Constants.E.damage} />
        のスキルダメージを与えて{Constants.E.slow.duration}秒間移動速度を{Constants.E.slow.effect}%減少させます。<br />
        栞が残った状態の敵には<Value skill="E" ratio={Constants.E.bookmark_damage} />のスキルダメージを与えて空中に浮かせます。<br />
        スアはドン・キホーテを的中させた場合、失った体力に比例して
        <Value skill="E" ratio={Constants.E.heal} /> ~ <Value skill="E" ratio={healMax} />
        の体力を回復します。<br />
        敵に的中させた場合、ドン・キホーテのクールダウンが{Constants.E.cooldown_reduction}%減少します。<br />
        スアが武器を変更する間には妨害効果免疫状態になります。
    </>
);

export default e;

export const values: ValuesProps = {
    additionalInfo: <>スアの体力が{Constants.E.heal_max_hp}%の場合、最大回復量が適用されます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "体力回復量", values: Constants.E.heal.base},
        {title: "強化されたダメージ量", values: Constants.E.bookmark_damage.base},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}