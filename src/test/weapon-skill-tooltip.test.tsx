import * as React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { WeaponSkillCodeDictionary } from "@app/ingame-params/weapon-skills/dictionary";
import Bed from "./skill-tooltip-bed";

const CodeWithID = Object.entries(WeaponSkillCodeDictionary).map(([id, code]) => ({
    id, code
}))

describe.each(CodeWithID)("$id's skill", ({ code }) => {
    test("tooltip match snapshot", () => {
        const { container } = render(<Bed code={+code} showEquation={false} />);
        expect(container).toMatchSnapshot()            
    })
    test("detailed tooltip match snapshot", () => {
        const { container } = render(<Bed code={+code} showEquation={true} />);
        expect(container).toMatchSnapshot()            
    })
})
