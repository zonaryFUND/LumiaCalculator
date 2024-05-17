import { EquipmentAbilityID } from "./id";
import { EquipmentAbility } from "./type";

export function parseEquipmentAbility(input: string): EquipmentAbility[] {
    return input.split(/(?<=]),?/)
        .map(part => part.trim())
        .filter(part => part.length > 0)
        .map(part => {
            const [id, rawValues] = part.split(/\[(.*)\]/)
                .map(p => p.trim())
                .filter(p => p.length > 0);
            
            const values = rawValues == undefined ? undefined : JSON.parse(`{${rawValues}}`);
            return { id: id as EquipmentAbilityID, values }
        });
}
