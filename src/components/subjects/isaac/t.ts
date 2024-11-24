import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1059100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ showEquation }) => {
        const base = {
            0: Constants.T.threshold,
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.T.damage.base,
                2: RatioPercent(Constants.T.damage.attack),
                5: RatioPercent(Constants.T.movement_speed),
                6: Constants.T.duration,
                7: RatioPercent(Constants.T.heal),
                9: RatioPercent(Constants.T.animal),
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                1: Constants.T.damage,
                3: RatioPercent(Constants.T.movement_speed),
                4: Constants.T.duration,
                5: RatioPercent(Constants.T.heal),
                6: RatioPercent(Constants.T.animal),
                7: RatioPercent(Constants.T.damage.targetMaxHP)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: Constants.T.threshold
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/MaxHpDamageRatio", values: Constants.T.damage.targetMaxHP, percent: true},
            {labelIntlID: "ToolTipType/HpRegenRatio", values: Constants.T.heal, percent: true},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed, percent: true}
        ]  
    }),
    calculatorMessage: "日本語翻訳ファイルでは詳細ツールチップに対象最大体力比例ダメージが記載されていません"
}
