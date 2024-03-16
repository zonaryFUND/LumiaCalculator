import * as React from "react"
import { SubjectID } from "@app/entity/subject";
import useStatus from "./use-status"
import { ImageURL } from "./image";

type Props = {
    subject: SubjectID
}

const subject: React.FC<Props> = props => {
    const {
        status, 
        onLevelSliderChange
    } = useStatus(props.subject);

    return (
        <section>
            <h3>{props.subject}</h3>
            <img src={ImageURL(props.subject)} />
            <table>
                <tbody>
                    <tr><td>最大体力</td><td>{status.maxHP.toNumber()}</td></tr>
                    <tr><td>最大スタミナ</td><td>{status.maxSP.toNumber()}</td></tr>
                    <tr><td>体力再生</td><td>{status.hpReg.toNumber()}</td></tr>
                    <tr><td>スタミナ再生</td><td>{status.spReg.toNumber()}</td></tr>
                    <tr><td>攻撃力</td><td>{status.attackPower.toNumber()}</td></tr>
                    <tr><td>防御力</td><td>{status.armor.toNumber()}</td></tr>
                    <tr><td>攻撃速度</td><td>{status.attackSpeed.toNumber()}</td></tr>
                    <tr><td>移動速度</td><td>{status.movementSpeed.toNumber()}</td></tr>
                </tbody>
            </table>
            <label>
                レベル
                <input type="range" min="1" defaultValue={1} max="20" step="1" onChange={onLevelSliderChange}/>
            </label>
        </section>
    )
}

export default subject;