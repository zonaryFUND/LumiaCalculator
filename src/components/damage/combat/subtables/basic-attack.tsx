import * as React from "react";
import { DamageTableUnit } from "app-types/damage-table/unit";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import SubTable from "./subtable";
import useBasicAttackInfo from "components/damage/use-basic-attack-info";
import { useIntl } from "react-intl";
import { BasicAttackElement } from "@app/ingame-params/subjects/type";

type Props = {
    elements: (BasicAttackElement | DamageTableUnit & { skillLevel?: number})[][]
    attacker: {
        config: SubjectConfig
        status: Status
        hp: number
    }
}

const basicAttack: React.FC<Props> = props => {
    const intl = useIntl();
    const {
        attackRatio: standardBasicAttackRatio, 
        labelIntlID: standardBasicAttackLabelIntlID,
        hitCount
    } = useBasicAttackInfo(props.attacker.config);

    const sanitizedElements = props.elements.map(chunk => {
        return chunk.flatMap(element => {
            if (typeof element == "string") {
                if (standardBasicAttackRatio) {
                    const unit: DamageTableUnit = {
                        label: intl.formatMessage({id: standardBasicAttackLabelIntlID}),
                        value: {attack: standardBasicAttackRatio, basicAttackAmp: 100},
                        type: {
                            type: "basic", 
                            critical: element == "disable-critical" ? "none" : undefined,
                            hitCount
                        }
                    }
                    return unit;
                } else {
                    return [];
                }
            } else {
                return element;
            }
        })
    })
    .filter(chunk => chunk.length > 0);


    return <SubTable 
        label="基本攻撃"
        elements={sanitizedElements}
        attacker={props.attacker}
    />
};

export default basicAttack;