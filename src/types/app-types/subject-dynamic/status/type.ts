import Decimal from "decimal.js"

export type StatusValue = {
    base?: Decimal
    perLevel?: Decimal
    equipment?: {
        constant?: Decimal
        adaptive?: Decimal  // added on post calculation
        perLevel?: Decimal
        ratio?: Decimal
    }
    perMastery?: {
        value?: Decimal
        ratio?: Decimal
    }
    overrideAdditional?: {
        nameKey: string
        value?: Decimal
        ratio?: Decimal
    }
    overrideFix?: {
        nameKey: string
        value: Decimal
    }
}

export type AdditionalStatusValue = {
    additional?: Decimal
}

export type CalculatedStatusValue = {
    calculatedValue: Decimal
}

export type SummonedStatus = {
    maxHP: Decimal
    attackPower: Decimal
    defense: Decimal
    attackSpeed: Decimal
    criticalChance: Decimal
    skillAmp: Decimal
    armorPenetration: Decimal
    armorPenetrationRatio: Decimal
}

export type Status = {
    maxHP: StatusValue & AdditionalStatusValue & CalculatedStatusValue
    hpReg: StatusValue & CalculatedStatusValue
    defense: StatusValue & AdditionalStatusValue & CalculatedStatusValue
    basicAttackReduction: StatusValue & CalculatedStatusValue
    basicAttackReductionConstant: StatusValue & CalculatedStatusValue // hidden status for calculation
    skillReduction: StatusValue & CalculatedStatusValue
    maxSP: StatusValue & CalculatedStatusValue,
    spReg: StatusValue & CalculatedStatusValue,
    attackPower: StatusValue & AdditionalStatusValue & CalculatedStatusValue
    basicAttackAmp: StatusValue & CalculatedStatusValue
    attackSpeed: StatusValue & AdditionalStatusValue & CalculatedStatusValue
    criticalChance: StatusValue & CalculatedStatusValue
    criticalDamage: CalculatedStatusValue
    skillAmp: StatusValue & CalculatedStatusValue
    cooldownReduction: {
        cap: Decimal
    } & CalculatedStatusValue
    armorPenetration: CalculatedStatusValue
    armorPenetrationRatio: StatusValue & CalculatedStatusValue
    omnisyphon: CalculatedStatusValue
    lifeSteal: CalculatedStatusValue
    healPower: CalculatedStatusValue
    tenacity: CalculatedStatusValue
    movementSpeed: StatusValue & CalculatedStatusValue
    visionRange: StatusValue & CalculatedStatusValue
    basicAttackRange: StatusValue & CalculatedStatusValue

    summonedStatus?: SummonedStatus
}

export type StatusBeforeCalculation = { [K in keyof Omit<Status, "summonedStatus">]: Status[K] extends infer T & CalculatedStatusValue ? T & Partial<CalculatedStatusValue> : never };

