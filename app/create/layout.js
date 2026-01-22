export const metadata = {
  title: 'Generate images with Flux.2-KLEIN for free',
  description: 'Create stunning AI-generated images instantly using Flux 2 KLEIN.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Vega AI — AI Image Generation',
    description: 'Generate high-quality images for free with Flux 2 KLEIN.',
    url: 'https://vega.js.org/create',
    siteName: 'Vega AI',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vega AI: AI Image Generation',
    description: 'Create high-quality AI-generated images instantly.',
    images: ['/og.png'],
  },
}

export default function CreateLayout({ children }) {
  return ( 
    <div className="bg-black text-white font-outfit">
      {children}
    </div>
  )
}