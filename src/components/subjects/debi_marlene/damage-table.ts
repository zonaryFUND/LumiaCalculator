import { SkillLevels } from "app-types/subject-dynamic/config";
import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";
import { Status } from "components/subject/status";
import { projectileAmount } from "./marlenew";

const marlW = {
    base: Constants.MarleneW.projectiles.base,
    additionalAttackSpeed: Constants.MarleneW.max_projectile,
    max: Constants.MarleneW.projectiles.base.map(v => v + Constants.MarleneW.max_projectile)
}

const table: DamageTableGenerator = props => {
    const wBullet = projectileAmount(props.status) + Constants.MarleneW.projectiles.base[props.skillLevels.W]; 

    return {
        //basicAttack: ["debimarl"],
        basicAttack: [
            {label: props.intl.formatMessage({id: "app.basic-attack"}), skill: "T", value: {attack: 75, basicAttackAmp: 100}, type: "basic-nocrit"}
        ],
        skill: [
            [{label: props.intl.formatMessage({id: "subject.debimarlene.debiq"}), skill: "Q", value: Constants.DebiQ.damage}],
            [{label: props.intl.formatMessage({id: "subject.debimarlene.debiw"}), skill: "W", value: Constants.DebiW.damage}],
            [
                {label: props.intl.formatMessage({id: "subject.debimarlene.debie-energy"}), skill: "E", value: Constants.DebiE.damage},
                {label: props.intl.formatMessage({id: "subject.debimarlene.debie-rush"}), skill: "E", value: Constants.DebiE.second_damage},
            ],
            [{label: props.intl.formatMessage({id: "subject.debimarlene.marleneq"}), skill: "Q", value: Constants.MarleneQ.damage}],
            [
                {label: props.intl.formatMessage({id: "subject.debimarlene.marlenew-bullets"}), skill: "W", value: marlW, type: "true"},
                {label: props.intl.formatMessage({id: "subject.debimarlene.marlenew-damage"}), skill: "W", value: Constants.MarleneW.damage},
                {label: props.intl.formatMessage({id: "subject.debimarlene.marlenew-damage-max-hit"}, {value: wBullet}), skill: "W", value: Constants.MarleneW.damage, multiplier: [{basic: wBullet * 100}]}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.debimarlene.marlenee-rush"}), skill: "E", value: Constants.MarleneE.damage},
                {label: props.intl.formatMessage({id: "subject.debimarlene.marlenee-energy"}), skill: "E", value: Constants.MarleneE.second_damage},
            ],
            [
                {label: props.intl.formatMessage({id: "subject.debimarlene.r-rush"}), skill: "R", value: Constants.R.damage},
                {label: props.intl.formatMessage({id: "subject.debimarlene.r-true-damage"}), skill: "R", value: Constants.R.second_damage, type: "true"},
                {label: props.intl.formatMessage({id: "subject.debimarlene.r-true-damage-max-hit"}, {value: Constants.R.second_damage_count}), skill: "R", value: Constants.R.second_damage, type: "true", multiplier: [{basic: Constants.R.second_damage_count * 100}]}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.debimarlene.passive-color-change"}), skill: "T", value: Constants.T.damage},
                {label: props.intl.formatMessage({id: "subject.debimarlene.passive-color-change-set"}, {value: Constants.T.max_stack}), skill: "T", value: Constants.T.damage, multiplier: [{basic: Constants.T.max_stack * 100}]}
            ]
        ]   
    }
}

export default table;