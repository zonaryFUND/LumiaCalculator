import * as React from "react";
import Status from "dict/status.json";
import baseStatus from "@app/entity/translate/base-status";
import Decimal from "decimal.js";

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
    status: Status
    level: number
    onLevelSliderChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function(subjectName: string): Response {
    const [level, setLevel] = React.useState(1);
    const [decimalLevel, levelM1] = React.useMemo(() => [new Decimal(level), new Decimal(level - 1)], [level]);
    const status = React.useMemo(() => baseStatus((Status as {[index: string]: any})[subjectName] as any), [subjectName]);
    const onLevelSliderChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(event => {
        setLevel(+event.target.value);
    }, []);

    return {
        status: {
            maxHP: status.maxHP.add(status.maxHPperLevel.times(levelM1)),
            maxSP: status.maxSP.add(status.maxSPperLevel.times(levelM1)),
            hpReg: status.hpRegeneration.add(status.hpRegenPerLevel.times(levelM1)),
            spReg: status.spRegenPerLevel.add(status.spRegenPerLevel.times(levelM1)),
            attackPower: status.attackPower.add(status.apPerLevel.times(levelM1)),
            armor: status.armor.add(status.armorPerLevel.times(levelM1)),
            attackSpeed: status.attackSpeed,
            movementSpeed: status.movementSpeed
        },
        level,
        onLevelSliderChange
    }
}