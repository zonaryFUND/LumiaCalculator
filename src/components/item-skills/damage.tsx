import * as React from "react";
import { ItemSkillProps } from "./item-skill";
import { equipmentStatus } from "app-types/equipment";
import BaseDamage from "components/subjects/damage";
import { WeaponTypeID, meleeOrRange } from "app-types/equipment/weapon";

type Props = {
    baseClassName?: string
    className?: string
}

const Damage: React.FC<Props & ItemSkillProps> = props => {
    const range = React.useMemo(() => {
        if (props.config?.equipment.weapon && props.showEquation != true) {
            return meleeOrRange(equipmentStatus(props.config.equipment.weapon).type as WeaponTypeID);
        } else {
            return undefined;
        }
    }, []);

    if (props.values.melee != undefined) {
        if (props.showEquation != false) {
            return <span className={props.baseClassName}>(<span className={props.className}>近距離：<Damage {...props} values={props.values.melee} /></span> | <span className={props.className}>遠距離：</span><Damage {...props} values={props.values.range} />)</span>;
        } else {
            return <Damage {...props} values={props.values[range || "melee"]} />;
        }
    } else {
        return <BaseDamage skill="item" config={props.config} status={props.status} showEquation={props.showEquation} constants={props.values} className={props.className} target="enemy" />;
    }
}

export default Damage;