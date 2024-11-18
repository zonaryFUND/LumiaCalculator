import { TooltipInfo } from "components/subjects/dictionary";
import * as React from "react";
import style from "./cooldown-consumption.module.styl";
import Decimal from "decimal.js";
import { Status } from "app-types/subject-dynamic/status/type";

const cooldownComsumption: React.FC<TooltipInfo & {skillLevel: number, status: Status}> = props => {
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
    const consumptionValue = Array.isArray(props.consumption?.value) ? 
        props.consumption.value[props.skillLevel] :
        props.consumption?.value ?? null;

    const cooldown = (() => {
        if (props.cooldown == undefined) return null;
        if (typeof props.cooldown == "function") return props.cooldown().toString();
        const arrayOrValue = (typeof props.cooldown == "object" && "constant" in props.cooldown) ? 
            props.cooldown.constant : props.cooldown;
        
        const cooldownBase = Array.isArray(arrayOrValue) ? arrayOrValue[props.skillLevel] : arrayOrValue;
        return new Decimal(cooldownBase).subPercent(props.status.cooldownReduction.calculatedValue).floor2().toString();
    })();

    /*
    const charge = (() => {
        if (info.charge == undefined) return null;
        const charge = (() => {
            if (info.charge.time.constant != undefined) {
                return valueOrElement(info.charge.time.constant, props.skillLevel);
            } else {
                const baseValue = valueOrElement(info.charge.time, props.skillLevel);
                return new Decimal(baseValue).subPercent(props.status.cooldownReduction.calculatedValue).toString();
            }
        })();
        return cooldown ? <>(チャージ時間{charge}秒)</> : <>チャージ時間{charge}秒</>;
    })();
    */

    return (
        <div className={style.cooldown}>
            {consumptionType}{consumptionValue}
            {consumptionType ? <br /> : null}
            {
                cooldown != null ?
                <>クールダウン{cooldown}秒</> :
                null
            }
        </div>
    );
};

export default cooldownComsumption;