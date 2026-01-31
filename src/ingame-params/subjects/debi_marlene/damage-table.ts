import { DamageTableGenerator } from "../type";
import Constants from "./constants";
import { MarleneWStrategy, projectileAmount } from "./marlenew";

const table: DamageTableGenerator = props => {
    const wBullet = projectileAmount(props.status) + Constants.MarleneW.projectiles.base[props.config.skillLevels.W]; 

    return {
        basicAttack: [
            {label: props.intl.formatMessage({id: "app.basic-attack"}), origin: "T", value: Constants.T.basic_attack_damage, type: {type: "basic", critical: "none"}}
        ],
        skill: [
            [{label: props.intl.formatMessage({id: "subject.debimarlene.debiq"}), origin: "Q", value: Constants.DebiQ.damage}],
            [{label: props.intl.formatMessage({id: "subject.debimarlene.debiw"}), origin: "W", value: Constants.DebiW.damage}],
            [
                {label: props.intl.formatMessage({id: "subject.debimarlene.debie-energy"}), origin: "E", value: Constants.DebiE.damage},
                {label: props.intl.formatMessage({id: "subject.debimarlene.debie-rush"}), origin: "E", value: Constants.DebiE.second_damage},
            ],
            [{label: props.intl.formatMessage({id: "subject.debimarlene.marleneq"}), origin: "Q", value: Constants.MarleneQ.damage}],
            [
                {label: props.intl.formatMessage({id: "subject.debimarlene.marlenew-bullets"}), origin: "W", value: MarleneWStrategy, type: {type: "misc"}},
                {label: props.intl.formatMessage({id: "subject.debimarlene.marlenew-damage"}), origin: "W", value: Constants.MarleneW.damage},
                {label: props.intl.formatMessage({id: "subject.debimarlene.marlenew-damage-max-hit"}, {value: wBullet}), origin: "W", value: Constants.MarleneW.damage, multiplier: 100 + (wBullet - 1) * Constants.MarleneW.multiple_hit}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.debimarlene.marlenee-rush"}), origin: "E", value: Constants.MarleneE.damage},
                {label: props.intl.formatMessage({id: "subject.debimarlene.marlenee-energy"}), origin: "E", value: Constants.MarleneE.second_damage},
            ],
            [
                {label: props.intl.formatMessage({id: "subject.debimarlene.r-rush"}), origin: "R", value: Constants.R.damage},
                {label: props.intl.formatMessage({id: "subject.debimarlene.r-true-damage"}), origin: "R", value: Constants.R.second_damage, type: {type: "true"}},
                {label: props.intl.formatMessage({id: "subject.debimarlene.r-true-damage-max-hit"}, {value: Constants.R.second_damage_count}), origin: "R", value: Constants.R.second_damage, type: {type: "true"}, multiplier: Constants.R.second_damage_count * 100}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.debimarlene.passive-color-change"}), origin: "T", value: Constants.T.damage},
                {label: props.intl.formatMessage({id: "subject.debimarlene.passive-color-change-set"}, {value: Constants.T.max_stack}), origin: "T", value: Constants.T.damage, multiplier: Constants.T.max_stack * 100}
            ]
        ]   
    }
}

export default table;