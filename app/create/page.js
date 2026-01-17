"use client"

import { useState, useRef } from "react"
import { Download, Zap, Loader } from "lucide-react"
import Link from "next/link"

export default function CreatePage() {
  const [prompt, setPrompt] = useState("")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const imageRef = useRef(null)

  const generateImage = async (e) => {
    e.preventDefault()

    if (!prompt.trim()) {
      setError("Please enter a prompt")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate image")
      }

      const data = await response.json()
      setImage(data.image)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const regenerateImage = () => {
    generateImage({ preventDefault: () => {} })
  }

  const downloadImage = async () => {
    if (!image) return

    try {
      const response = await fetch(image)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `vega-ai-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch {
      setError("Failed to download image")
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800/50 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Vega AI
          </Link>
          <p className="text-sm text-slate-400">Create & Generate</p>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="w-full lg:w-80 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Create an Image</h2>
            <p className="text-sm text-slate-400">
              Describe what you want to create
            </p>
          </div>

          <form onSubmit={generateImage} className="space-y-4">
            <div>
              <label htmlFor="prompt" className="text-sm font-medium">
                Prompt
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={loading}
                placeholder="A serene mountain landscape with aurora borealis..."
                className="w-full h-24 px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Generate Image
                </>
              )}
            </button>
          </form>

          {image && (
            <div className="flex gap-3">
              <button
                onClick={downloadImage}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg font-semibold hover:bg-slate-800"
              >
                <Download className="w-4 h-4" />
                Download
              </button>

              <button
                onClick={regenerateImage}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Zap className="w-4 h-4" />
                )}
                Regenerate
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full aspect-square lg:h-[600px] bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
            {image ? (
              <img
                ref={imageRef}
                src={image}
                alt="Generated image"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-slate-400">
                {loading
                  ? "Generating your image..."
                  : "Your generated image will appear here"}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}