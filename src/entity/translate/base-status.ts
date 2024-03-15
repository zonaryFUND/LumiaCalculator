import Decimal from "decimal.js";
import type { BaseStatus } from "../base-status";

export default function (obj: any): BaseStatus {
    return {
        maxHP: new Decimal(obj.maxhp),
        maxHPperLevel: new Decimal(obj.maxhppl),
        maxSP: new Decimal(obj.maxsp),
        maxSPperLevel: new Decimal(obj.maxsppl),
        hpRegeneration: new Decimal(obj.hpreg),
        hpRegenPerLevel: new Decimal(obj.hpregpl),
        spRegeneration: new Decimal(obj.spreg),
        spRegenPerLevel: new Decimal(obj.spregpl),
        attackPower: new Decimal(obj.ad),
        apPerLevel: new Decimal(obj.adpl),
        armor: new Decimal(obj.ar),
        armorPerLevel: new Decimal(obj.arpl),
        attackSpeed: new Decimal(obj.as),
        movementSpeed: new Decimal(obj.ms)
    }
}