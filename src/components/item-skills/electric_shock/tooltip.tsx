import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { ItemSkillProps } from "../item-skill";
import { equipmentStatus } from "app-types/equipment";
import { WeaponTypeID, meleeOrRange } from "app-types/equipment/weapon";
import { useValueContextOptional } from "components/tooltip/value-context";

const Value: React.FC<ItemSkillProps> = props => {
    const { config, status, showEquation } = useValueContextOptional();
    const perLevel = React.useMemo(() => {
        if (props.values.melee != undefined) return 0;
        return (props.values.levelProp.to - props.values.levelProp.from) / 19;
    }, [props.values.levelProp]);

    const range = React.useMemo(() => {
        if (config?.equipment.weapon && !showEquation) {
            return meleeOrRange(equipmentStatus(config.equipment.weapon).type as WeaponTypeID);
        } else {
            return undefined;
        }
    }, []);

    if (props.values.melee != undefined) {
        if (showEquation != false) {
            return <>(近距離：<Value {...props} values={props.values.melee} /> | 遠距離：<Value {...props} values={props.values.range} />)</>;
        } else {
            return <Value {...props} values={props.values[range || "melee"]} />;
        }
    } else {
        const value = config && showEquation != true ?
            props.values.levelProp.from + (config!.level - 1) * perLevel :
            null;

        return <>
            <span className={style.maxhp}>敵の最大体力の{props.values.targetMaxHP}%</span>
            {value == null ? <> + </> : null}
            <span className={style.level}>
                {value ? <>(+{value})</> : null}
                {value == null ? <>{props.values.levelProp.from} ~ {props.values.levelProp.to}(キャラクターレベル比例)</> : null}
            </span>
        </>
    }
}

const description: React.FC<ItemSkillProps> = props => (
    <p>
        基本攻撃するたびに{Constants.duration}秒間電撃をチャージします。(最大{Constants.max_stack}回)<br />
        最大チャージ状態で基本攻撃したり、シールドのある対象を基本攻撃すると、<Value {...props} values={props.values.dmg} />の追加スキルダメージを与え、
        すべての電撃のチャージ量を失います。
    </p> 
);

export default description;