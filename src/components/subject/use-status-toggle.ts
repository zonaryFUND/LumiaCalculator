import { useToggle } from "react-use"

type ToggleValue = [boolean, () => void];

type Response = {
    toughness: ToggleValue
    stamina: ToggleValue
    basicAttack: ToggleValue
    skill: ToggleValue
    penetration: ToggleValue
    heal: ToggleValue
    others: ToggleValue
}

export default function(): Response {
    return {
        toughness: useToggle(false),
        stamina: useToggle(false),
        basicAttack: useToggle(false),
        skill: useToggle(false),
        penetration: useToggle(false),
        heal: useToggle(false),
        others: useToggle(false)
    }
}