import Constants from "./constants.json";
import { StatusOverrideFunc } from "../type";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import Decimal from "decimal.js";
import { EquipmentStatusDictionary } from "app-types/equipment";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";

export const accelerando = (config: SubjectConfig) => {
    const equipment = Object.values(config.equipment)
        .reduce((sum, id) => {
            if (!id) return sum;
            const value = EquipmentStatusDictionary[id].cooldownReduction?.toNumber() || 0;
            return (sum ?? 0) + value;
        }, 0)
    const screamMax = Math.max(0, Constants.T.stack_conversion_limit - (equipment ?? 0));

    return (equipment ?? 0) + Math.min(screamMax, config.stack * Constants.T.stack_conversion);
}

export const cdr = (accelerando: number) => new Decimal(accelerando / (100 + accelerando) * 100).round()

const f: StatusOverrideFunc = (status, config) => {
    const accelerandoValue = accelerando(config);
    return {
        ...status,
        cooldownReduction: AddComponent({
            ...status.cooldownReduction,
            max: undefined   
        }, {
            origin: "perpetual_status",
            calculationType: "fix",
            intlID: "accelerando",
            value: {
                type: "constant",
                value: cdr(accelerandoValue)
            }
        })
    }
};

export default f;
