import Constants from "./constants.json";
import { EquipmentAbilityPerpetualStatus } from "../type";

const f: EquipmentAbilityPerpetualStatus = () => ({
    attackPower: [{
        origin: "perpetual_status",
        calculationType: "sum",
        intlID: "CharacterState/Group/Name/6077000",
        value: {
            type: "status-conversion",
            func: status => status.maxHp.additionalValue.percent(Constants.attack.additionalMaxHP).floor()
        }
    }]
})

export default f;
