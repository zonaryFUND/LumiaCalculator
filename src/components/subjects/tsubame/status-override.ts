import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../status-override";

const range = new Decimal(Constants.T.range);

// シーズン4リワークでおそらく日の目を見ないので手抜き
const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    attackPower: {
        ...status.attackPower,
        overrideAdditional: {
            nameKey: "subject.tsubame.passive-attack",
            value: (status.criticalChance.equipment?.constant?.times(Constants.T.attack_per_critical_chance) ?? new Decimal(0))
                .add(status.criticalDamage.calculatedValue?.times(Constants.T.attack_per_critical_damage) ?? 0)
                .round()
        }
    },
    basicAttackRange: {
        ...status.basicAttackRange,
        overrideFix: {
            nameKey: "subject.tsubame.passive-range",
            value: range
        },
        calculatedValue: range
    }
});

export default f;