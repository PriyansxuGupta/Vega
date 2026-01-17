import Link from "next/link"
import { Zap } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800/50 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Vega AI</h1>
          <Link
            href="/create"
            className="text-sm text-slate-400 hover:text-slate-200 transition"
          >
            Create
          </Link>
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Vega AI
          </h2>

          <p className="text-slate-400 text-lg">
            Introducing Vega AI. Generates images from text, powered by Cloudflare.
            Describe anything and turn it into visuals instantly.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <Zap className="w-4 h-4" />
              Start Creating
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800/50 py-4 text-center text-sm text-slate-500">
        Vega AI · Powered by Cloudflare
      </footer>
    </main>
  )
}