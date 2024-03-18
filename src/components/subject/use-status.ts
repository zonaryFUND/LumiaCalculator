import * as React from "react";
import Decimal from "decimal.js";
import { baseStatus } from "@app/entity/base-status";
import { SubjectID } from "@app/entity/subject";

type Status = {
    maxHP: Decimal
    maxSP: Decimal
    hpReg: Decimal
    spReg: Decimal
    attackPower: Decimal
    armor: Decimal
    attackSpeed: Decimal
    movementSpeed: Decimal
}

type Response = {
    status?: Status
    level: number
    onLevelSliderChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function(subject: SubjectID | null): Response {
    const [level, setLevel] = React.useState(1);
    const [decimalLevel, levelM1] = React.useMemo(() => [new Decimal(level), new Decimal(level - 1)], [level]);
    const status = React.useMemo(() => subject ? baseStatus(subject) : null, [subject]);
    const onLevelSliderChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(event => {
        setLevel(+event.target.value);
    }, []);

    return {
        status: status ? {
            maxHP: status.maxHP.add(status.maxHPperLevel.times(levelM1)),
            maxSP: status.maxSP.add(status.maxSPperLevel.times(levelM1)),
            hpReg: status.hpRegeneration.add(status.hpRegenPerLevel.times(levelM1)),
            spReg: status.spRegenPerLevel.add(status.spRegenPerLevel.times(levelM1)),
            attackPower: status.attackPower.add(status.apPerLevel.times(levelM1)),
            armor: status.armor.add(status.armorPerLevel.times(levelM1)),
            attackSpeed: status.attackSpeed,
            movementSpeed: status.movementSpeed
        } : undefined,
        level,
        onLevelSliderChange
    }
}