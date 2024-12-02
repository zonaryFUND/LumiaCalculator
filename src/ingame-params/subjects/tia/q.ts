import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const base: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.damage.base,
        2: RatioPercent(Constants.Q.damage.amp),
        3: RatioPercent(Constants.Q.damage.amp),
        5: Constants.Q.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base}
        ]  
    })
}

export const y = {
    code: 1048400,
    info: {
        ...base,
        values: props => ({
            ...base.values(props),
            3: RatioPercent(Constants.Q.y.slow.effect),
            4: Constants.Q.y.slow.duration
        })
    } satisfies SkillTooltipProps
}

export const r = {
    code: 1048410,
    info: {
        ...base,
        values: props => ({
            ...base.values(props),
            3: RatioPercent(Constants.Q.r.slow.effect),
            4: Constants.Q.r.slow.duration
        })
    } satisfies SkillTooltipProps
}

export const b = {
    code: 1048420,
    info: {
        ...base,
        values: props => ({
            ...base.values(props),
            2: Constants.Q.b.center_addition,
            6: Constants.Q.b.center_slow.duration,
            7: RatioPercent(Constants.Q.b.center_slow.effect),
            8: Constants.Q.b.slow.duration,
            9: RatioPercent(Constants.Q.b.slow.effect)
        }),
        expansion: props => ({
            enumeratedValues: [
                ...base.expansion(props).enumeratedValues,
                {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.Q.b.center_addition.base}
            ]
        })
    } satisfies SkillTooltipProps
}