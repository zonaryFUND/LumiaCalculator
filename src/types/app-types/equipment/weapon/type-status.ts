import Decimal from "decimal.js";
import { WeaponTypeID } from "./type-id";
import { NimbleAPIJSON } from "@app/params-json";

type Status = {
    attackSpeed: Decimal
    range: Decimal
}

/**
 * 武器種ごとに設定されている、実験体の基礎値に追加される攻撃速度/射程の値が格納されているjsonを洗浄した辞書
 */
export const WeaponTypeStatus = NimbleAPIJSON.WeaponTypeStatus.reduce((prev, entry) => {
    return {
        ...prev,
        [entry.type]: {
            attackSpeed: new Decimal(entry.attackSpeed),
            range: new Decimal(entry.attackRange)
        }
    }
}, {} as { [key in WeaponTypeID]: Status });
