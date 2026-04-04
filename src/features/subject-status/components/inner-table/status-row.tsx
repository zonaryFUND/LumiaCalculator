import * as React from "react";
import { StatusValueComponent } from "app-types/subject-dynamic/status/value-component/component";
import WeaponBaseStatus from "./subject-with-weapon-row";
import ConstantValueRow from "./constant-value-row";
import { FormattedMessage } from "react-intl";
import * as table from "@components/status/status-table.module.styl";
import * as style from "@components/status/chunks/misc.module.styl";
import Decimal from "decimal.js";

const StatusRow: React.FC<StatusValueComponent & { percent?: boolean }> = (component) => {
    if (component.value.type == "weapon-base") {
        return (
            <WeaponBaseStatus  
                subjectValue={component.value.subject}
                weaponValue={component.value.weapon}
            />
        )
    }

    const labelIntlID: string = (() => {
        if (component.intlID) return component.intlID;

        switch (component.origin) {
            case "subject-status":
                return "app.subject";
            case "equipment":
                return "app.equipment";
            case "perpetual_status":
            case "temporary-status":
                throw new Error("status component lacks label intlID");
        }
    })();

    switch (component.value.type) {
        case "constant":
            return (
                <ConstantValueRow 
                    labelIntlID={labelIntlID} 
                    value={component.value.value} 
                    showPercent={component.percent} 
                />
            )
        case "level-dependent": {
            const labelID = component.value.incrementalFactor.type == "level" ? "app.level" : "app.mastery";
            const label = <span className={table.small}><FormattedMessage id={labelID} /></span>;
            const incrementalFactor = component.value.incrementalFactor.oneBased ? 
                <>{label}({component.value.incrementalFactor.value.toString()} - 1)</> : 
                <>{label}{component.value.incrementalFactor.value.toString()}</>;

            return (
                <tr>
                    <td><FormattedMessage id={labelIntlID} /></td>
                    <td>
                        <>{component.value.multiplier.toString()}{percent} x {incrementalFactor}</>
                        <> = {component.value.value.toString()}{percent}</>
                    </td>
                </tr>
            )
        }
        case "combined": {
            const labelID = component.value.incrementalFactor.type == "level" ? "app.level" : "app.mastery";
            const label = <span className={table.small}><FormattedMessage id={labelID} /></span>;
            const incrementalFactor = component.value.incrementalFactor.oneBased ? 
                <>{label}({component.value.incrementalFactor.value.toString()} - 1)</> : 
                <>{label}{component.value.incrementalFactor.value.toString()}</>;
            const multiplied = new Decimal(component.value.value).sub(component.value.constant)

            return (
                <tr>
                    <td><FormattedMessage id={labelIntlID} /></td>
                    <td>
                        <>{component.value.constant.toString()} + </>
                        {multiplied.toString()}<span className={style.multiply}>({component.value.multiplier.toString()} x {incrementalFactor})</span>
                        <> = {component.value.value.toString()}{percent}</>
                    </td>
                </tr>
            );
        }
        case "status-conversion":
            const label = <span className={table.small}><FormattedMessage id={component.intlID} /></span>;

            return (
                <tr>
                    <td><FormattedMessage id={labelIntlID} /></td>
                    <td>{component.value.value?.toString()}{percent}</td>
                </tr>
            );
    }
}

export default StatusRow;
