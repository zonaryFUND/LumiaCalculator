import Constants from "./constants.json";
import { StatusOverrideFunc } from "../status-override";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import Decimal from "decimal.js";
import { EquipmentStatusDictionary } from "app-types/equipment";

export const accelerando = (config: SubjectConfig) => {
    const equipment = Object.values(config.equipment)
        .reduce((sum, id) => {
            if (!id) return sum;
            const value = EquipmentStatusDictionary[id].cooldownReduction?.toNumber() || 0;
            return sum + value;
        }, 0)
    const screamMax = Math.max(0, Constants.T.stack_conversion_limit - equipment);

    return equipment + Math.min(screamMax, config.stack * Constants.T.stack_conversion);
}

const f: StatusOverrideFunc = (status, config) => {
    const accelerandoValue = accelerando(config);
    return {
        ...status,
        cooldownReduction: {
            ...status.cooldownReduction,
            calculatedValue: new Decimal(accelerandoValue / (100 + accelerandoValue) * 100).round()
        }
    }
};

export default f;
