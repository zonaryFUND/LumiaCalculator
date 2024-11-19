import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1039100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: `${Constants.T.attack_speed[skillLevel]}%`,
        2: Constants.T.duration,
        3: showEquation ? Constants.T.shield.base[skillLevel] : Constants.T.shield,
        4: showEquation ? `${Constants.T.shield.attack}%` : Constants.T.wt_cooldown_reduction,
        5: Constants.T.wt_cooldown_reduction,
        6: Constants.T.duration
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.T.shield.base},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.T.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant},
        ]  
    })
}


const t: React.FC<SubjectSkillProps> = props => (
    <>
        カミロが敵にダメージを与えると3秒間シールドが生成されて<Value skill="T" ratio={Constants.T.shield} />
        のダメージを防ぎ、攻撃速度が{Constants.T.attack_speed[props.skillLevel]}%増加します。<br />
        基本攻撃とスキルで交互にダメージを与えると、オーレとシエレのクールダウンが{Constants.T.wt_cooldown_reduction}秒減少します。
    </>
)
