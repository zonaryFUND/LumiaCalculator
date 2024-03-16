import { SubjectID } from "@app/entity/subject"

import jackie from "resources/subjects/jackie.png"
import aya from "resources/subjects/aya.png"
import hyunwoo from "resources/subjects/hyunwoo.png"
import magnus from "resources/subjects/magnus.png"
import fiora from "resources/subjects/fiora.png"
import nadine from "resources/subjects/nadine.png"
import zahir from "resources/subjects/zahir.png"
import hart from "resources/subjects/hart.png"
import isol from "resources/subjects/li dailin.png"
import lidailin from "resources/subjects/li dailin.png"

import yuki from "resources/subjects/yuki.png"
import hyejin from "resources/subjects/hyejin.png"
import xiukai from "resources/subjects/xiukai.png"
import sissela from "resources/subjects/sissela.png"
import chiara from "resources/subjects/chiara.png"
import adriana from "resources/subjects/adriana.png"
import silvia from "resources/subjects/silvia.png"
import shoichi from "resources/subjects/shoichi.png"
import emma from "resources/subjects/emma.png"
import lenox from "resources/subjects/lenox.png"

import rozzi from "resources/subjects/rozzi.png"
import luke from "resources/subjects/luke.png"
import cathy from "resources/subjects/cathy.png"
import adela from "resources/subjects/adela.png"
import bernice from "resources/subjects/bernice.png"
import barbara from "resources/subjects/barbara.png"
import alex from "resources/subjects/alex.png"
import sua from "resources/subjects/sua.png"
import leon from "resources/subjects/leon.png"
import eleven from "resources/subjects/eleven.png"

import rio from "resources/subjects/rio.png"
import william from "resources/subjects/william.png"
import nicky from "resources/subjects/nicky.png"
import nathapon from "resources/subjects/nathapon.png"
import jan from "resources/subjects/jan.png"
import eva from "resources/subjects/eva.png"
import daniel from "resources/subjects/daniel.png"
import jenny from "resources/subjects/jenny.png"
import camilo from "resources/subjects/camilo.png"
import chloe from "resources/subjects/chloe.png"

import johann from "resources/subjects/johann.png"
import bianca from "resources/subjects/bianca.png"
import celine from "resources/subjects/celine.png"
import echion from "resources/subjects/echion.png"
import mai from "resources/subjects/mai.png"
import aiden from "resources/subjects/aiden.png"
import laura from "resources/subjects/laura.png"
import tia from "resources/subjects/tia.png"
import felix from "resources/subjects/felix.png"
import elena from "resources/subjects/elena.png"

import priya from "resources/subjects/priya.png"
import adina from "resources/subjects/adina.png"
import markus from "resources/subjects/markus.png"
import karla from "resources/subjects/karla.png"
import estelle from "resources/subjects/estelle.png"
import piolo from "resources/subjects/piolo.png"
import martina from "resources/subjects/martina.png"
import haze from "resources/subjects/haze.png"
import isaac from "resources/subjects/isaac.png"
import tazia from "resources/subjects/tazia.png"

import irem from "resources/subjects/irem.png"
import theodore from "resources/subjects/theodore.png"
import lyann from "resources/subjects/ly anh.png"
import vanya from "resources/subjects/vanya.png"
import debimarlene from "resources/subjects/debimarlene.png"
import arda from "resources/subjects/arda.png"
import abigail from "resources/subjects/abigail.png"
import alonso from "resources/subjects/alonso.png"
import leni from "resources/subjects/leni.png"
import tsubame from "resources/subjects/tsubame.png"

import kenneth from "resources/subjects/kenneth.png"
import katja from "resources/subjects/katja.png"

export const SubjectImage = {
    jackie, aya, hyunwoo, magnus, fiora, nadine, zahir, hart, isol, lidailin,
    yuki, hyejin, xiukai, sissela, chiara, adriana, silvia, shoichi, emma, lenox,
    rozzi, luke, cathy, adela, bernice, barbara, alex, sua, leon, eleven,
    rio, william, nicky, nathapon, jan, eva, daniel, jenny, camilo, chloe,
    johann, bianca, celine, echion, mai, aiden, laura, tia, felix, elena,
    priya, adina, markus, karla, estelle, piolo, martina, haze, isaac, tazia,
    irem, theodore, lyann, vanya, debimarlene, arda, abigail, alonso, leni, tsubame, 
    kenneth, katja
}

export function ImageURL(subject: SubjectID): string {
    return (SubjectImage as any)[subject]
}