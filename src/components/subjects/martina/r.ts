import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1057500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.recorded_movement_speed.duration,
        1: RatioPercent(Constants.R.recorded_movement_speed.effect),
        3: Constants.R.max_stack,
        4: Constants.R.multiple_subject_recording_time,
        5: 2,
        6: Constants.R.multiple_subject_mastery,
        7: 1,
        8: Constants.R.dead_body_mastery,
        9: Constants.R.max_dead_body_stack,
        10: Constants.R.dead_body_recording_time,
        11: RatioPercent(Constants.R.recording_movement_speed),
        24: Constants.R.reshooting_prohibit
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
