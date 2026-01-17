import { database } from "./firebase"
import { ref, get, set, update, runTransaction } from "firebase/database"

// Configuração dos links - 50/50 para cada produto
// Troca automaticamente após 50 cliques

const CLICKS_PER_LINK = 50

export interface LinkRotationConfig {
    linkAtual: number // 0 = original, 1 = clone
    links: {
        url: string
        cliques: number
    }[]
}

// Estrutura inicial de todos os produtos com seus links
export const INITIAL_PRODUCTS_CONFIG: Record<string, LinkRotationConfig> = {
    // EA SPORTS FC 26 - MIDIA DIGITAL SECUNDÁRIA
    "EAFC 26 Bundle": {
        linkAtual: 0,
        links: [
            { url: "https://go.invictuspay.app.br/p9z3m78rwl", cliques: 0 },
            { url: "https://go.invictuspay.app.br/tomxa1cvih", cliques: 0 },
        ],
    },

    // JOGO EAFC 26 + PATCH TIMES BRASILEIROS
    "PATCH EAFC 26 + JOGO EAFC 26": {
        linkAtual: 0,
        links: [
            { url: "https://go.invictuspay.app.br/3p65wtvjht", cliques: 0 },
            { url: "https://go.invictuspay.app.br/qgmhepfjap", cliques: 0 },
        ],
    },

    // EAFC 26 - PATCH TIMES BRASILEIROS
    "EAFC 26 - Times Brasileiros": {
        linkAtual: 0,
        links: [
            { url: "https://go.invictuspay.app.br/qaatnpzass", cliques: 0 },
            { url: "https://go.invictuspay.app.br/dh3hctq74r", cliques: 0 },
        ],
    },

    // JOGO EAFC 25 + PATCH TIMES BRASILEIROS
    "PATCH EAFC 25 + JOGO EAFC 25 - TIMES BRASILEIROS": {
        linkAtual: 0,
        links: [
            { url: "https://go.invictuspay.app.br/rt0t2uecxd", cliques: 0 },
            { url: "https://go.invictuspay.app.br/u1oepkk5zl", cliques: 0 },
        ],
    },

    // EAFC 25 - PATCH TIMES BRASILEIROS
    "EAFC 25 - Times Brasileiros Licenciados": {
        linkAtual: 0,
        links: [
            { url: "https://go.invictuspay.app.br/fuv2ufja8l", cliques: 0 },
            { url: "https://go.invictuspay.app.br/clslptoxk2", cliques: 0 },
        ],
    },

    // EAFC 24 - PATCH TIMES BRASILEIROS
    "EAFC 24 - Times Brasileiros Licenciados": {
        linkAtual: 0,
        links: [
            { url: "https://go.invictuspay.app.br/kllijhnfgx", cliques: 0 },
            { url: "https://go.invictuspay.app.br/sy8mfsqkby", cliques: 0 },
        ],
    },

    // PES 2021 VERSÃO 25 + JOGO PES 21
    "PES 2021 VERSÃO 25 + JOGO PES 21 - TIMES BRASILEIROS": {
        linkAtual: 0,
        links: [
            { url: "https://go.invictuspay.app.br/ovmhlg21rh", cliques: 0 },
            { url: "https://go.invictuspay.app.br/eftbrno9gz", cliques: 0 },
        ],
    },

    // PES 2021 - VERSÃO 2025
    "PES 2021 VERSÃO 25 - TIMES BRASILEIROS": {
        linkAtual: 0,
        links: [
            { url: "https://go.invictuspay.app.br/qcgqeanwjc", cliques: 0 },
            { url: "https://go.invictuspay.app.br/60plrgo5gq", cliques: 0 },
        ],
    },
}

// Função para sanitizar o nome do produto (Firebase não aceita certos caracteres)
function sanitizeProductName(name: string): string {
    return name.replace(/[.#$[\]]/g, "_")
}

// Inicializar produto no Firebase se não existir
export async function initializeProductIfNeeded(productName: string): Promise<void> {
    const sanitizedName = sanitizeProductName(productName)
    const productRef = ref(database, `products/${sanitizedName}`)

    try {
        const snapshot = await get(productRef)
        if (!snapshot.exists()) {
            const initialConfig = INITIAL_PRODUCTS_CONFIG[productName]
            if (initialConfig) {
                await set(productRef, initialConfig)
                console.log(`Produto ${productName} inicializado no Firebase`)
            }
        }
    } catch (error) {
        console.error("Erro ao inicializar produto:", error)
    }
}

// Buscar link atual e incrementar contador (função principal)
export async function getPaymentLinkWithRotation(productName: string): Promise<string> {
    const sanitizedName = sanitizeProductName(productName)
    const productRef = ref(database, `products/${sanitizedName}`)

    try {
        // Inicializa se não existir
        await initializeProductIfNeeded(productName)

        // Usa transação para garantir consistência
        const result = await runTransaction(productRef, (currentData: LinkRotationConfig | null) => {
            if (!currentData) {
                // Produto não existe, usar configuração inicial
                const initialConfig = INITIAL_PRODUCTS_CONFIG[productName]
                if (initialConfig) {
                    return {
                        ...initialConfig,
                        links: initialConfig.links.map((link, index) =>
                            index === 0 ? { ...link, cliques: 1 } : link
                        ),
                    }
                }
                return null
            }

            const linkAtual = currentData.linkAtual
            const links = [...currentData.links]

            // Incrementa cliques do link atual
            links[linkAtual].cliques += 1

            // Verifica se atingiu 50 cliques
            if (links[linkAtual].cliques >= CLICKS_PER_LINK) {
                // Reseta contador do link atual
                links[linkAtual].cliques = 0
                // Troca para o outro link (0 -> 1 ou 1 -> 0)
                const novoLink = linkAtual === 0 ? 1 : 0

                return {
                    linkAtual: novoLink,
                    links: links,
                }
            }

            return {
                linkAtual: linkAtual,
                links: links,
            }
        })

        if (result.committed && result.snapshot.exists()) {
            const data = result.snapshot.val() as LinkRotationConfig
            // Retorna o link que FOI usado (antes da possível troca)
            const linkUsado = data.links[data.linkAtual].url
            return linkUsado
        }

        // Fallback para configuração local
        const fallbackConfig = INITIAL_PRODUCTS_CONFIG[productName]
        if (fallbackConfig) {
            return fallbackConfig.links[0].url
        }

        return "#"
    } catch (error) {
        console.error("Erro ao buscar link com rotação:", error)

        // Fallback para configuração local em caso de erro
        const fallbackConfig = INITIAL_PRODUCTS_CONFIG[productName]
        if (fallbackConfig) {
            return fallbackConfig.links[0].url
        }

        return "#"
    }
}

// Obter estatísticas atuais de um produto
export async function getProductStats(productName: string): Promise<LinkRotationConfig | null> {
    const sanitizedName = sanitizeProductName(productName)
    const productRef = ref(database, `products/${sanitizedName}`)

    try {
        const snapshot = await get(productRef)
        if (snapshot.exists()) {
            return snapshot.val() as LinkRotationConfig
        }
        return null
    } catch (error) {
        console.error("Erro ao buscar estatísticas:", error)
        return null
    }
}

// Resetar contadores de um produto (útil para testes)
export async function resetProductCounters(productName: string): Promise<void> {
    const sanitizedName = sanitizeProductName(productName)
    const productRef = ref(database, `products/${sanitizedName}`)

    const initialConfig = INITIAL_PRODUCTS_CONFIG[productName]
    if (initialConfig) {
        await set(productRef, initialConfig)
        console.log(`Contadores do produto ${productName} resetados`)
    }
}

// Inicializar todos os produtos no Firebase
export async function initializeAllProducts(): Promise<void> {
    for (const productName of Object.keys(INITIAL_PRODUCTS_CONFIG)) {
        await initializeProductIfNeeded(productName)
    }
    console.log("Todos os produtos inicializados no Firebase")
}
