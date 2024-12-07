import * as React from "react";
import { StatusValue } from "app-types/subject-dynamic/status/value/type";
import InnerTable from "components/common/inner-table";
import { FormattedMessage } from "react-intl";
import table from "components/common/table.module.styl";

const expandStatus: React.FC<StatusValue> = props => {
    return (
        <InnerTable>
            {
                props.components.map(component => {
                    const labelIntlID = (() => {
                        switch (component.origin) {
                            case "subject-status":
                                return "app.subject";
                            case "equipment":
                                return "app.equipment";
                            case "perpetual_status":
                            case "temporary-status":
                                if (component.intlID == undefined) {
                                    throw new Error("status component lacks label intlID")
                                }
                                return component.intlID;
                        }
                    })();

                    const equation = (() => {
                        switch (component.value.type) {
                            case "constant":
                                return <>{component.value.constant.toString()}</>;
                            case "level-dependent":
                                const label = component.value.incrementalFactor.type == "level" ? "app.level" : "app.mastery";
                                return <><span className={table.small}><FormattedMessage id={label} /></span>{component.value.incrementalFactor.toString()} x {component.value.multiplier.toString()}</>
                            case "combined":
                                return <>{component.value.constant.toString()} + <span className={table.small}><FormattedMessage id="app.mastery" /></span>{component.value.incrementalFactor.value.toString()} x {component.value.muliplier.toString()}</>
                        }
                    })();

                    return (
                        <tr>
                            <td><FormattedMessage id={labelIntlID} /></td>
                            <td>{equation}</td>
                        </tr>
                    );
                })
            }
        </InnerTable>
    );
}

export default expandStatus;