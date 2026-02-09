import Constants from "./constants";
import { SubjectPerpetualStatus } from "../type";

const f: SubjectPerpetualStatus = () => ({
    attackPower: [
        {
            origin: "perpetual_status",
            calculationType: "mul",
            intlID: "subject.martina.passive-attack",
            value: {
                type: "status-conversion",
                func: status => status.attackSpeed.multiplier.dividedBy(Constants.T.attack_speed_conversion.from).floor().times(Constants.T.attack_speed_conversion.to)
            }
        }
    ]
})

export default f;
