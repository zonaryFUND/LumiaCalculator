import * as React from "react";
import InnerTable from "components/common/inner-table";
import { StatusValueComponent } from "core/subject-dynamic/status/value-component/component";
import WeaponBaseStatus from "./subject-with-weapon-row";
import ConstantValueRow from "./constant-value-row";
import MultipliedRow from "./multiplied-row";
import SumAndMultipliedRow from "./sum-and-multiply-row";

type Props = {
    components: (StatusValueComponent & { percent?: boolean })[]
    additionalSubRow?: React.ReactElement | React.ReactElement[]
    percent?: boolean
}

const ExpandedStatusDescription: React.FC<Props> = props => {
    return (
        <InnerTable>
            {
                props.components.map((component, i) => {
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
                                    key={`${i}-constant`}
                                    labelIntlID={labelIntlID} 
                                    value={component.value.value} 
                                    showPercent={component.percent} 
                                />
                            )
                        case "level-dependent": {
                            // Bのラベルはレベルまたは熟練度
                            const bLabelID = component.value.incrementalFactor.type == "level" ? "app.level" : "app.mastery";

                            return (
                                <MultipliedRow 
                                    key={`${i}-multiplied`}
                                    labelIntlID={labelIntlID} 
                                    a={component.value.multiplier} 
                                    b={{
                                        labelIntlID: bLabelID,
                                        value: component.value.incrementalFactor.value,
                                        showMinusOne: component.value.incrementalFactor.oneBased
                                    }} 
                                    result={component.value.value} 
                                    percent={component.percent} 
                                />
                            )
                        }
                        case "combined": {
                            const labelID = component.value.incrementalFactor.type == "level" ? "app.level" : "app.mastery";

                            return (
                                <SumAndMultipliedRow
                                    key={`${i}-combined`}
                                    labelIntlID={labelIntlID} 
                                    constant={component.value.constant} 
                                    a={component.value.multiplier} 
                                    b={{
                                        labelIntlID: labelID,
                                        value: component.value.incrementalFactor.value,
                                        showMinusOne: component.value.incrementalFactor.oneBased
                                    }} 
                                    result={component.value.value} 
                                    percent={component.percent} 
                                />
                            )
                        }
                        case "status-conversion":
                            return (
                                <ConstantValueRow 
                                    key={`${i}-status-conversion`}
                                    labelIntlID={labelIntlID} 
                                    value={component.value.value ?? 0} 
                                    showPercent={component.percent} 
                                />
                            )
                        case "weapon-base":
                            return (
                                <WeaponBaseStatus 
                                    key={`${i}-weapon-base`}
                                    subjectValue={component.value.subject} 
                                    weaponValue={component.value.weapon} 
                                />
                            )
                    }
                })
            }
            {props.additionalSubRow}
        </InnerTable>
    );
}

export default ExpandedStatusDescription;