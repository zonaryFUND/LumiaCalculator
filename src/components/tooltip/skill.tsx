import { EquipmentAbility, name } from "@app/entity/equipment-ability";
import * as React from "react";
import PrimodalHex from "components/item-skills/primodal-hex";
import Vigor from "components/item-skills/vigor";
import MagneticMidnight from "components/item-skills/magnetic-midnight";
import Smolder from "components/item-skills/smolder";
import LichsGrasp from "components/item-skills/lichs-grasp";
import Zephyr from "components/item-skills/zephyr";
import HealingReduction from "components/item-skills/healing-reduction";
import ChargeCarrier from "components/item-skills/charge-carrier";
import BioticInfusion from "components/item-skills/biotic-infusion";

const skill: React.FC<EquipmentAbility> = props => {
    const text = (() => {
        switch (props.id) {
            case "primodal_hex": 
                return <PrimodalHex values={props.values} />;
            case "vigor": 
                return <Vigor values={props.values} />;
            case "magnetic_midnight": 
                return <MagneticMidnight values={props.values} />;
            case "smolder": 
                return <Smolder values={props.values} />;
            case "lichs_grasp": 
                return <LichsGrasp values={props.values} />;
            case "zephyr": 
                return <Zephyr values={props.values} />;
            case "healing_reduction_strong":
                return <HealingReduction intensity="strong" />;
            case "healing_reduction_weak":
                return <HealingReduction intensity="weak" />;
            case "charge_carrier":
                return <ChargeCarrier />;
            case "biotic_infusion":
                return <BioticInfusion values={props.values} />;
                
            default: return null;
        }
    })();

    return (
        <div>
            <header>
                <h2>固有装備効果</h2>
            </header>
            <h3>{name(props.id, "jp")}</h3>
            {text}
        </div>
    );
};

export default skill;