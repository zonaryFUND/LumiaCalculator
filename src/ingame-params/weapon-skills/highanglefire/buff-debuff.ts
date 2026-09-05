import Constants from "./constants.json";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// 移動速度減少（スロウ）自体は汎用デバフ（generic-slow.ts）1本にまとめるため、
// ここではgivenBuffDebuffに個別登録せず、「辞書」表示専用の参照データとしてのみ宣言する。
// 1撃目・2撃目で効果量が異なる（l10n上はいずれも"煙幕"で同名のCharacterStateが2件存在するのみで、
// テキストによる区別はできないため、宣言順を1撃目→2撃目に対応させた）
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "CharacterState/Group/Name/3005000", values: Constants.first_slow.effect },
    { nameIntlID: "CharacterState/Group/Name/3005010", values: Constants.second_slow.effect }
];
