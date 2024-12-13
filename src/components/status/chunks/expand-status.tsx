import * as React from "react";
import InnerTable from "components/common/inner-table";
import { FormattedMessage } from "react-intl";
import style from "./expand-status.module.styl";
import table from "components/common/table.module.styl";
import Decimal from "decimal.js";
import { StatusValueComponent } from "app-types/subject-dynamic/status/value/components";

type Props = {
    components: (StatusValueComponent & { percent?: boolean })[]
    additionalSubRow?: React.ReactElement | React.ReactElement[]
    percent?: boolean
}

const expandStatus: React.FC<Props> = props => {
    return (
        <InnerTable>
            {
                props.components.map((component, i) => {
                    if (component.origin == "weapon-base" && component.value.type == "weapon-base") {
                        return (
                            <tr key={`${i}-weapon-base`}>
                                <td><FormattedMessage id="app.standard-value" /></td>
                                {
                                    component.value.weapon ?
                                    <td>
                                        <span className={table.small}><FormattedMessage id="app.subject" /></span>{component.value.subject.toString()}
                                        <> + </>
                                        <span className={table.small}><FormattedMessage id="app.weapon" /></span>{component.value.weapon.toString()}
                                        <> = {component.value.value.toString()}</>
                                    </td>
                                    :
                                    <td>
                                        <span className={table.small}><FormattedMessage id="app.subject" /></span>{component.value.value.toString()}
                                    </td>
                                }
                            </tr>
                        )
                    }

                    const labelIntlID = (() => {
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

                    const percent = component.percent != false && (props.percent || component.calculationType == "mul") ? <>%</> : null;

                    switch (component.value.type) {
                        case "constant":
                            return (
                                <tr key={`${i}-constant`}>
                                    <td><FormattedMessage id={labelIntlID} /></td>
                                    <td>{component.value.value.toString()}{percent}</td>
                                </tr>
                            )
                        case "level-dependent": {
                            const labelID = component.value.incrementalFactor.type == "level" ? "app.level" : "app.mastery";
                            const label = <span className={table.small}><FormattedMessage id={labelID} /></span>;
                            const incrementalFactor = component.value.incrementalFactor.oneBased ? 
                                <>{label}({component.value.incrementalFactor.value.toString()} - 1)</> : 
                                <>{label}{component.value.incrementalFactor.value.toString()}</>;

                            return (
                                <tr key={`${i}-leveldependent`}>
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
                                <tr key={`${i}-combined`}>
                                    <td><FormattedMessage id={labelIntlID} /></td>
                                    <td>
                                        <>{component.value.constant.toString()} + </>
                                        {multiplied.toString()}<span className={style.multiply}>({component.value.multiplier.toString()} x {incrementalFactor})</span>
                                        <> = {component.value.value.toString()}{percent}</>
                                    </td>
                                </tr>
                            );
                        }
                    }
                })
            }
            {props.additionalSubRow}
        </InnerTable>
    );
}

export default expandStatus;