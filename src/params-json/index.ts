
import WeaponTypeStatus from "./nimbleapi/weapon-type-status.json";
import WeaponStatus from "./nimbleapi/weapon.json";
import ArmorStatus from "./nimbleapi/armor.json";
import BaseStatus from "./nimbleapi/base-status.json";
import LevelUpStatus from "./nimbleapi/levelup-status.json";
import SubjectMasteryIncrement from "./nimbleapi/mastery.json";

import DavidUpgradeStatus from "./fabricated/david-upgrade.json";
import WeaponAbility from "./fabricated/weapon-skill.json";
import ArmorAbility from "./fabricated/armor-skill.json";

/**
 * NimbleNeuron APIから得られたゲーム内数値JSONを格納するObject
 * 
 * src/nn-api　で定義された呼び出しメソッドで取得され、一部JSONはその直後に加工される
 */
export const NimbleAPIJSON = {
    /**
     * 武器種の内部識別名と、その武器種自体に紐づけられた攻撃速度、射程の追加値
     */
    WeaponTypeStatus,

    /**
     * 英雄等級以上のすべての武器のID、ステータス
     */
    WeaponStatus,

    /**
     * 英雄等級以上のすべての防具のID、ステータス
     */
    ArmorStatus,

    /**
     * すべての実験体のID、およびLv1ステータス
     */
    SubjectBaseStatus: BaseStatus,

    /**
     * すべての実験体のレベルアップ時の（1ごとの）ステータス増加量
     */
    LevelUpStatus,

    /**
     * 全実験体の武器種ごとの武器熟練度比例ステータス増加量
     */
    SubjectMasteryIncrement
}

/**
 * NimbleNeuron APIでは取得できないためゲーム内数値やパッチノートを参照して作成されたゲーム内数値JSONを格納するObject
 */
export const FabricatedJSON = {
    /**
     * マイのパッシブスキルによって伝説等級以上の胴装備がDavidにアップグレードされるときの差分ステータス
     */
    DavidUpgradeStatus,

    /**
     * 固有アビリティを持つ武器IDと対応する装備アビリティの識別コード（翻訳ファイル基準）、および装備ごとにダメージや効果量が異なる場合のその値
     */
    WeaponAbility,

    /**
     * 固有アビリティを持つ防具IDと対応する装備アビリティの識別コード（翻訳ファイル基準）、および装備ごとにダメージや効果量が異なる場合のその値
     */
    ArmorAbility
}