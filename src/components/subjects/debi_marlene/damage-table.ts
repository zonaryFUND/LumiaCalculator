import { DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";
import { MarleneWStrategy, projectileAmount } from "./marlenew";

const table: DamageTableGenerator = props => {
    const wBullet = projectileAmount(props.status) + Constants.MarleneW.projectiles.base[props.config.skillLevels.W]; 

    return {
        basicAttack: [
            {label: props.intl.formatMessage({id: "app.basic-attack"}), skill: "T", value: {attack: 75, basicAttackAmp: 100}, type: {type: "basic", critical: "none"}}
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
                {label: props.intl.formatMessage({id: "subject.debimarlene.marlenew-bullets"}), skill: "W", value: MarleneWStrategy, type: {type: "misc"}},
                {label: props.intl.formatMessage({id: "subject.debimarlene.marlenew-damage"}), skill: "W", value: Constants.MarleneW.damage},
                {label: props.intl.formatMessage({id: "subject.debimarlene.marlenew-damage-max-hit"}, {value: wBullet}), skill: "W", value: Constants.MarleneW.damage, multiplier: wBullet * 100}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.debimarlene.marlenee-rush"}), skill: "E", value: Constants.MarleneE.damage},
                {label: props.intl.formatMessage({id: "subject.debimarlene.marlenee-energy"}), skill: "E", value: Constants.MarleneE.second_damage},
            ],
            [
                {label: props.intl.formatMessage({id: "subject.debimarlene.r-rush"}), skill: "R", value: Constants.R.damage},
                {label: props.intl.formatMessage({id: "subject.debimarlene.r-true-damage"}), skill: "R", value: Constants.R.second_damage, type: {type: "true"}},
                {label: props.intl.formatMessage({id: "subject.debimarlene.r-true-damage-max-hit"}, {value: Constants.R.second_damage_count}), skill: "R", value: Constants.R.second_damage, type: {type: "true"}, multiplier: Constants.R.second_damage_count * 100}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.debimarlene.passive-color-change"}), skill: "T", value: Constants.T.damage},
                {label: props.intl.formatMessage({id: "subject.debimarlene.passive-color-change-set"}, {value: Constants.T.max_stack}), skill: "T", value: Constants.T.damage, multiplier: Constants.T.max_stack * 100}
            ]
        ]   
    }
}

export default table;