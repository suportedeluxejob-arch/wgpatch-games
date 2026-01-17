/**
 * Configuração Centralizada de Links de Pagamento
 * 
 * Este arquivo contém todos os links de pagamento (PIX e Cartão) para todos os produtos.
 * Para adicionar ou atualizar links, edite apenas este arquivo.
 * 
 * Estrutura:
 * - pix: Link para pagamento via PIX (Invictus Pay)
 * - card: Link para pagamento via Cartão (Cakto)
 */

export interface PaymentLink {
    pix: string
    card: string
}

export const PAYMENT_LINKS: Record<string, PaymentLink> = {
    // ==================== EAFC 26 ====================
    "PATCH EAFC 26 + JOGO EAFC 26": {
        pix: "https://go.invictuspay.app.br/3p65wtvjht",
        card: "https://pay.cakto.com.br/agtjpxf_638373",
    },

    "EAFC 26 - Times Brasileiros": {
        pix: "https://go.invictuspay.app.br/qaatnpzass",
        card: "https://pay.cakto.com.br/5jgfx87_638363",
    },

    // Produtos da homepage (Bundle EAFC 26)
    "EAFC 26 Bundle": {
        pix: "https://go.invictuspay.app.br/p9z3m78rwl",
        card: "https://go.invictuspay.app.br/ywfgl87azm",
    },

    // ==================== EAFC 25 ====================
    "EAFC 25 - Times Brasileiros Licenciados": {
        pix: "https://go.invictuspay.app.br/rt0t2uecxd",
        card: "https://pay.cakto.com.br/agtjpxf_638373",
    },

    "PATCH EAFC 25 + JOGO EAFC 25 - TIMES BRASILEIROS": {
        pix: "https://go.invictuspay.app.br/fuv2ufja8l",
        card: "https://pay.cakto.com.br/39xfxuj_638367",
    },

    // ==================== EAFC 24 ====================
    "EAFC 24 - Times Brasileiros Licenciados": {
        pix: "https://go.invictuspay.app.br/sy8mfsqkby",
        card: "https://pay.cakto.com.br/337h6fv_638368",
    },

    // ==================== PES 2021 ====================
    "PES 2021 VERSÃO 25 + JOGO PES 21 - TIMES BRASILEIROS": {
        pix: "https://go.invictuspay.app.br/ovmhlg21rh",
        card: "https://pay.cakto.com.br/3634a38_638395",
    },

    "PES 2021 VERSÃO 25 - TIMES BRASILEIROS": {
        pix: "https://go.invictuspay.app.br/qcgqeanwjc",
        card: "https://pay.cakto.com.br/8fekayj_638394",
    },

    // ==================== CELULAR ====================
    "DFL 25 - TIMES BRASILEIROS CELULAR": {
        pix: "https://pay.cakto.com.br/xa54qtu_638427",
        card: "https://pay.cakto.com.br/xa54qtu_638427",
    },

    // ==================== JOGOS COMPLETOS ====================
    "EA SPORTS FC 26": {
        pix: "https://go.invictuspay.app.br/3p65wtvjht",
        card: "https://pay.cakto.com.br/agtjpxf_638373",
    },

    "EA SPORTS FC 25": {
        pix: "https://go.invictuspay.app.br/rt0t2uecxd",
        card: "https://pay.cakto.com.br/39xfxuj_638367",
    },

    "PES 2021 (eFootball)": {
        pix: "https://go.invictuspay.app.br/ovmhlg21rh",
        card: "https://pay.cakto.com.br/3634a38_638395",
    },

    // ==================== PRODUTOS DA HOMEPAGE ====================
    "DFL 25 Mobile": {
        pix: "https://pay.cakto.com.br/xa54qtu_638427",
        card: "https://pay.cakto.com.br/xa54qtu_638427",
    },

    "PES 2021 V25 Patch": {
        pix: "https://pay.cakto.com.br/xhxaq8h_638384",
        card: "https://pay.cakto.com.br/xhxaq8h_638384",
    },
}

/**
 * Função auxiliar para obter os links de pagamento de um produto
 * @param productName - Nome do produto
 * @returns Links de pagamento ou links vazios se não encontrado
 */
export function getPaymentLinks(productName: string): PaymentLink {
    return (
        PAYMENT_LINKS[productName] || {
            pix: "#",
            card: "#",
        }
    )
}
