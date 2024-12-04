import * as React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest"
import { Locales } from "../App"
import { SubjectModules } from "../ingame-params/subjects/type";
import Bed from "./skill-tooltip-bed";

const modules = import.meta.glob<{default: SubjectModules}>("../ingame-params/subjects/*/index.ts", {eager: true});
const SubjectSkills = Object.values(modules).reduce((prev, current) => {
    return {
        ...prev,
        [current.default.code]: Object.keys(current.default.skills.tooltip).map(v => +v)
    }
}, {} as Record<number, number[]>);

const CodeWithName = Object.keys(SubjectSkills).map(code => ({
     code: +code, name: Locales["ja"][`Character/Name/${code}`]  
}))

describe.each(CodeWithName)("$name's", ({ code }) => {
    const CodeWithName = SubjectSkills[code].map(code => ({
        code: +code, name: Locales["ja"][`Skill/Group/Name/${code}`]
    }))

    describe.each(CodeWithName)("skill $name", ({ code }) => {
        test("tooltip matchs snapshot", () => {
            const { container } = render(<Bed code={+code} showEquation={false} />);
            expect(container).toMatchSnapshot()            
        })

        test("detailed tooltip matchs snapshot", () => {
            const { container } = render(<Bed code={+code} showEquation={true} />);
            expect(container).toMatchSnapshot()            
        })
    })
})
