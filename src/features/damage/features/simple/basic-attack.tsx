import { BasicAttackElement } from "@app/ingame-params/subjects/type";
import { DamageTableUnit } from "app-types/damage-table/unit";
import * as React from "react";
import SubTable from "../../components/simple/subtable";
import useBasicAttackRatio from "../../use-basic-attack-ratio";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import CriticalAvailable from "../potency-rows/critical-available";
import { FormattedMessage } from "react-intl";

type Props = {
    unitsChunks: (BasicAttackElement | DamageTableUnit & { skillLevel?: number })[][]
}

const BasicAttack: React.FC<Props> = (props) => {
    // 致命打が発生しない実験体に対しては、通常のスキルダメージと同様のヘッダを表示する
    // そうでない通常の実験体に対しては、致命打が発生する可能性があるため、通常威力・致命打威力・期待値の3列で表示する
    const displayCriticalHead = props.unitsChunks.flat().some(element => { 
        if (element == "standard") return true;
        if (typeof element == "object" && element.type?.type == "basic" && element.type.critical != "none") return true;
        return false;
    });

    const config = useSubjectStateStore(state => state.config);
    const { attackRatio: standardAttackRatio, labelIntlID: standardAttackLabelIntlID } = useBasicAttackRatio(config);

    const unitsChunks = props.unitsChunks.map(chunk => {
        return chunk.map((unit): React.ReactElement => {
            if (unit == "standard" && standardAttackRatio != undefined) {
                // 致命打について通常通りのダメージ計算を適用する「standard」定義であり、
                // かつ攻撃力レシオが非undefinedで返されている（武器を装備している）場合、
                // 致命打の可能性がある威力セルを返す
                return <CriticalAvailable
                    key="standard"
                    label={standardAttackLabelIntlID}
                    {...unit}
                />

                return {
                    ...unit,
                    type: { type: "basic", critical: "none", percentExpression: false },
                    multiplier: { ratio: standardAttackRatio, skillLevel: undefined, trigger: undefined },
                    labelIntlID: standardAttackLabelIntlID
                }
            }
            return unit;
        })
    })

    return (
        <SubTable 
            labelIntlID="app.basic-attack"
            displayCriticalHead={displayCriticalHead}
            unitsChunks={props.unitsChunks}
        />        
    )
}