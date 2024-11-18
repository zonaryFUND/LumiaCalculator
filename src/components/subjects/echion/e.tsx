import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import Decimal from "decimal.js";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const e: React.FC<SubjectSkillProps> = props => {
    const { config } = useValueContext();

    return (
        <>
            指定した方向に突進して経路上の敵に<Value skill="E" ratio={Constants.E.damage} />
            のスキルダメージを与えます。刻印がない対象にダメージを与えた場合にはクールダウンが初期化されます。最初に的中した対象に
            {Constants.E.mark}秒間維持される刻印を残します。<br />
            <br />
            オーバーロード状態になると突進距離が減少します。<br />
            <br />
            VFゲージ増加量：{Constants.E.vf_gauge[props.skillLevel]}<br />
            使用時ダメージ増幅量：{new Decimal(config.gauge).times(Constants.R.damage_amp_per_vf[config.skillLevels.R]).toString()}%
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "VFゲージ増加量", values: Constants.E.vf_gauge},
        {title: "クールダウン", values: Constants.E.cooldown},
    ]
}