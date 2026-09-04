import * as React from "react";
import Decimal from "decimal.js";
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

// stackが0の自己バフ・他者バフ（origin: "temporary-status"）は、buff-debuff/README.mdの規約により
// stack=0でも常にStatusValueComponentを返す（それ自体は正しい設計。ingame-params/README.md参照）ため、
// 何も選択していない状態でも常にこのComponentStatusValueに要素として存在してしまう。それをそのまま展開表示に
// 出すと「+0」のノイズ行になるので、表示レイヤーでのみ除外する（計算結果自体には影響しない）。
// value.valueがundefined（status-conversionで未計算）の場合は判断できないため除外しない
function isNoOpTemporaryStatus(component: StatusValueComponent): boolean {
    if (component.origin != "temporary-status") return false;
    const value = component.value.value;
    if (value == undefined) return false;
    return new Decimal(value).isZero();
}

const ExpandedStatusDescription: React.FC<Props> = props => {
    return (
        <InnerTable>
            {
                props.components.filter(component => !isNoOpTemporaryStatus(component)).map((component, i) => {
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

                    // 明示的な指定（component.percent）があればそれを優先し、なければ呼び出し側の一括指定
                    // （props.percent）、それもなければcalculationTypeから自動判定する（mul = 割合値）
                    const percent = component.percent ?? props.percent ?? component.calculationType == "mul";
                    // バフ・デバフ由来（origin: "temporary-status"）の行は背景色で区別する
                    const highlight = component.origin == "temporary-status";

                    switch (component.value.type) {
                        case "constant":
                            return (
                                <ConstantValueRow
                                    key={`${i}-constant`}
                                    labelIntlID={labelIntlID}
                                    value={component.value.value}
                                    showPercent={percent}
                                    highlight={highlight}
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
                                    percent={percent}
                                    highlight={highlight}
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
                                    percent={percent}
                                    highlight={highlight}
                                />
                            )
                        }
                        case "status-conversion":
                            return (
                                <ConstantValueRow
                                    key={`${i}-status-conversion`}
                                    labelIntlID={labelIntlID}
                                    value={component.value.value ?? 0}
                                    showPercent={percent}
                                    highlight={highlight}
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