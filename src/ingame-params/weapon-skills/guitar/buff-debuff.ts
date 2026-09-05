import Constants from "./constants.json";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// 移動速度減少（スロウ）自体は汎用デバフ（generic-slow.ts）1本にまとめるため、
// ここではgivenBuffDebuffに個別登録せず、「辞書」表示専用の参照データとしてのみ宣言する
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "CharacterState/Group/Name/3023000", values: [Constants.slow.effect] }
];
