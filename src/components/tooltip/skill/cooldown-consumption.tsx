import * as React from "react";
import style from "./cooldown-consumption.module.styl";
import Decimal from "decimal.js";
import { Status } from "app-types/subject-dynamic/status/type";
import { extractArrayOrValue } from "@app/util/array";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { SkillTooltipProps } from "../../../ingame-params/tooltip-props";

const cooldownComsumption: React.FC<SkillTooltipProps & {skillLevel: number, config: SubjectConfig, status: Status}> = props => {
    const consumptionType = (() => {
        switch (props.consumption?.type) {
            case "hp":
                return "体力 "
            case "hp-ratio":
                return "現在体力 "
            case "sp":
                return "スタミナ "
            case undefined:
                return "コストなし"
        }
    })();
    const consumptionValue = props.consumption ? extractArrayOrValue(props.consumption.value, props.skillLevel) : null;

    const cooldown = (() => {
        if (props.cooldown == undefined) return null;
        if (typeof props.cooldown == "function") return props.cooldown({config: props.config, status: props.status}).toString();
        if (typeof props.cooldown == "object" && "constant" in props.cooldown) {
            return extractArrayOrValue(props.cooldown.constant, props.skillLevel);
        }
    
        return new Decimal(extractArrayOrValue(props.cooldown, props.skillLevel)).subPercent(props.status.cooldownReduction.calculatedValue).floor2().toString();
    })();

    const charge = (() => {
        if (props.charge == undefined) return null;
        if (typeof props.charge.time == "object" && "constant" in props.charge.time) {
            return extractArrayOrValue(props.charge.time.constant, props.skillLevel);
        }

        return new Decimal(extractArrayOrValue(props.charge.time, props.skillLevel)).subPercent(props.status.cooldownReduction.calculatedValue).floor2().toString();
    })();

    return (
        <div className={style.cooldown}>
            {consumptionType}{consumptionValue}{props.consumption?.type == "hp-ratio" ? "%" : null}<br />
            {
                cooldown != null ?
                <>クールダウン{cooldown}秒</> :
                null
            }
            {
                charge != null ?
                (cooldown ? <>(チャージ時間{charge}秒)</> : <>チャージ時間{charge}秒</>) :
                null
            }
        </div>
    );
};

export default cooldownComsumption;