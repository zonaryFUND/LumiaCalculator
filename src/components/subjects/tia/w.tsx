import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

type Props = SubjectSkillProps & {
    to: React.ReactElement
    from: string
}

const w: React.FC<Props> = props => (
    <>
        筆の色を{props.to}に変更します。スキルレベルが上がるほど{props.from}の絵の具を用意する時間が短縮されます。
    </>
)

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "黄色クールダウン", values: Constants.W.y},
        {title: "赤色クールダウン", values: Constants.W.r},
        {title: "青色クールダウン", values: Constants.W.b}
    ]
}