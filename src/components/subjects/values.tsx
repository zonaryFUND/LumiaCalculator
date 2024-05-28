import * as React from "react";
import style from "./values.module.styl";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";

export type ValuesProps = {
    additionalInfo?: React.ReactElement
    parameters: {
        title: string
        values: (number | string)[]
        percent?: boolean
    }[]
}

export type ValuesPropsGenerator = (props: { config: SubjectConfig, status: Status }) => ValuesProps;

const values: React.FC<ValuesProps & {skillLevel: number}> = props => (
    <>
        {props.additionalInfo ? <p className={style.additional}>{props.additionalInfo}</p> : null}
        <ul className={style.values}>
            {
                props.parameters.map(parameter => {
                    const values = parameter.values
                        .map(v => `${v}${parameter.percent ? "%" : ""}`)
                        .map((v, i) => {
                            const content = i == props.skillLevel ?
                            <span>{v}</span> :
                            v

                            const separator = i < parameter.values.length - 1 ? " / " : "";
                            return <React.Fragment key={i}>{content}{separator}</React.Fragment>
                        })

                    return (
                        <li key={parameter.title}>
                            <h3>{parameter.title}</h3>
                            <p>[{values}]</p>
                        </li>
                    )
                })
            }
        </ul>
    </>
);


export default values;