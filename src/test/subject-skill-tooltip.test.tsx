import * as React from "react";
import { render } from "@testing-library/react";
import { SubjectModules } from "../ingame-params/subjects/type";
import Bed from "./skill-tooltip-bed";
import { Locales } from "../App"

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

    // 実データ全量を対象にした、クラッシュしないことのみを保証するsmoke test
    // （docs/testing-guidelines.md「④ 実データ全量スナップショット」参照。toMatchSnapshot()による厳密一致
    // 検証はバランス調整パッチのたびに大量に落ちシグナルとして機能しないため廃止した。render()が例外を
    // 投げなければ成功とみなし、レンダリング結果が空でないことだけを確認する）
    describe.each(CodeWithName)("skill $name", ({ code }) => {
        test("tooltip renders without crashing", () => {
            const { container } = render(<Bed code={+code} showEquation={false} />);
            expect(container.textContent).not.toBe("")
        })

        test("detailed tooltip renders without crashing", () => {
            const { container } = render(<Bed code={+code} showEquation={true} />);
            expect(container.textContent).not.toBe("")
        })
    })
})
