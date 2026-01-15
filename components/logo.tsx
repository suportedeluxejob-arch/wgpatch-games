"use client"

interface LogoProps {
  /**
   * URL da imagem da logo. Pode ser um caminho local (/images/logo.png) ou URL externa.
   * Exemplo: "/images/logo.png" ou "https://exemplo.com/logo.png"
   */
  imageUrl?: string
  /**
   * Tamanho da logo em pixels (largura e altura, pois é circular)
   * Padrão: 120
   */
  size?: number
  /**
   * Texto alternativo para a imagem
   * Padrão: "Logo"
   */
  alt?: string
}

export function Logo({ 
  imageUrl = "https://iili.io/fv4Ka0G.jpg", 
  size = 120,
  alt = "Logo" 
}: LogoProps) {
  return (
    <div className="flex justify-center w-full mb-8">
      <div 
        className="relative rounded-full overflow-hidden border-4 border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300"
        style={{ 
          width: size, 
          height: size,
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-full object-cover"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">WG</span>
          </div>
        )}
      </div>
    </div>
  )
}
