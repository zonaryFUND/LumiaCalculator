import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

// 治癒減少の効果量は装備の等級で変化する（英雄・伝説=20%、神話=30%）。2026年頃のテコ入れパッチ後、
// しばらくして等級別に再調整されたための仕様
const values: EquipmentAbilityTooltipValues = ({ itemGrade }) => ({
    0: Constants.duration,
    1: Constants.effect[itemGrade]
})

export default values;