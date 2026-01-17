// =====================================================================
// CONFIGURAÇÃO CENTRALIZADA DE LINKS DE PAGAMENTO
// =====================================================================
// Este arquivo contém todos os links de pagamento do site.
// Para atualizar um link, modifique apenas este arquivo.
//
// AGORA COM ROTAÇÃO AUTOMÁTICA FIREBASE!
// Os links PIX são gerenciados com rotação 50/50 via Firebase.
// Os links de CARTÃO permanecem fixos.
// =====================================================================

export interface PaymentLink {
    pix: string
    card: string
}

// Links de CARTÃO (fixos - não rotacionam)
export const CARD_LINKS: Record<string, string> = {
    // EAFC 26
    "PATCH EAFC 26 + JOGO EAFC 26": "https://pay.cakto.com.br/agtjpxf_638373",
    "EAFC 26 - Times Brasileiros": "https://pay.cakto.com.br/5jgfx87_638363",
    "EAFC 26 Bundle": "",

    // EAFC 25
    "EAFC 25 - Times Brasileiros Licenciados": "https://pay.cakto.com.br/39xfxuj_638367",
    "PATCH EAFC 25 + JOGO EAFC 25 - TIMES BRASILEIROS": "https://pay.cakto.com.br/39xfxuj_638367",

    // EAFC 24
    "EAFC 24 - Times Brasileiros Licenciados": "https://pay.cakto.com.br/337h6fv_638368",

    // PES 2021
    "PES 2021 VERSÃO 25 + JOGO PES 21 - TIMES BRASILEIROS": "https://pay.cakto.com.br/3634a38_638395",
    "PES 2021 VERSÃO 25 - TIMES BRASILEIROS": "https://pay.cakto.com.br/8fekayj_638394",

    // Mobile e Outros
    "DFL 25 - TIMES BRASILEIROS CELULAR": "https://pay.cakto.com.br/xa54qtu_638427",

    // Jogos Avulsos
    "EA SPORTS FC 26": "https://pay.cakto.com.br/agtjpxf_638373",
    "EA SPORTS FC 25": "https://pay.cakto.com.br/39xfxuj_638367",
    "PES 2021 (eFootball)": "https://pay.cakto.com.br/3634a38_638395",
    "DFL 25 Mobile": "https://pay.cakto.com.br/xa54qtu_638427",
    "PES 2021 V25 Patch": "https://pay.cakto.com.br/8fekayj_638394",
}

// Fallback para links PIX (usado quando Firebase não está disponível)
export const PIX_LINKS_FALLBACK: Record<string, string> = {
    "PATCH EAFC 26 + JOGO EAFC 26": "https://go.invictuspay.app.br/3p65wtvjht",
    "EAFC 26 - Times Brasileiros": "https://go.invictuspay.app.br/qaatnpzass",
    "EAFC 26 Bundle": "https://go.invictuspay.app.br/p9z3m78rwl",
    "EAFC 25 - Times Brasileiros Licenciados": "https://go.invictuspay.app.br/fuv2ufja8l",
    "PATCH EAFC 25 + JOGO EAFC 25 - TIMES BRASILEIROS": "https://go.invictuspay.app.br/rt0t2uecxd",
    "EAFC 24 - Times Brasileiros Licenciados": "https://go.invictuspay.app.br/kllijhnfgx",
    "PES 2021 VERSÃO 25 + JOGO PES 21 - TIMES BRASILEIROS": "https://go.invictuspay.app.br/ovmhlg21rh",
    "PES 2021 VERSÃO 25 - TIMES BRASILEIROS": "https://go.invictuspay.app.br/qcgqeanwjc",
    "DFL 25 - TIMES BRASILEIROS CELULAR": "https://pay.cakto.com.br/xa54qtu_638427",
    "EA SPORTS FC 26": "https://go.invictuspay.app.br/3p65wtvjht",
    "EA SPORTS FC 25": "https://go.invictuspay.app.br/rt0t2uecxd",
    "PES 2021 (eFootball)": "https://go.invictuspay.app.br/ovmhlg21rh",
    "DFL 25 Mobile": "https://pay.cakto.com.br/xa54qtu_638427",
    "PES 2021 V25 Patch": "https://go.invictuspay.app.br/qcgqeanwjc",
}

import { getPaymentLinkWithRotation } from "./firebase-link-manager"

// Função assíncrona que retorna links com rotação para o PIX
export async function getPaymentLinksWithRotation(productName: string): Promise<PaymentLink> {
    const pixLink = await getPaymentLinkWithRotation(productName)
    return {
        pix: pixLink,
        card: CARD_LINKS[productName] || "#",
    }
}

// Função síncrona que retorna links fixos (para fallback e cartão)
export function getPaymentLinks(productName: string): PaymentLink {
    return {
        pix: PIX_LINKS_FALLBACK[productName] || "#",
        card: CARD_LINKS[productName] || "#",
    }
}
