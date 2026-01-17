"use client"

import { useState, useRef } from "react"
import { RiAiGenerate } from "react-icons/ri"
import { IoSparkles } from "react-icons/io5"
import { Download, RotateCcw, Loader } from "lucide-react"
import ColorBends from "@/components/ColorBends"

export default function CreatePage() {
  const [prompt, setPrompt] = useState("")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const imageRef = useRef(null)

  const generateImage = async (e) => {
    e?.preventDefault()
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

      const text = await response.text()
      const data = JSON.parse(text)
      if (!response.ok) throw new Error(data.error || "Generation failed")

      setImage(data.image)
    } catch (err) {
      setError(err?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = async () => {
    if (!image) return
    const res = await fetch(image)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `vega-ai-${Date.now()}.png`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black/90">
      <div className="absolute inset-0 -z-10">
        <ColorBends rotation={10} frequency={1} />
        <div className="absolute inset-0 bg-black/90" />
      </div>

      <main className="relative z-10 flex flex-col items-center px-4 py-8">
        {/* Title */}
        <h1 className="mb-6 text-xl font-mono tracking-wide text-neutral-200">
          Vega Ai
        </h1>

        {/* Canvas */}
        <div
          className="w-full max-w-3xl aspect-square rounded-2xl overflow-hidden
          flex items-center justify-center mb-5"
          style={{ backgroundColor: "#111111" }}
        >
          {image ? (
            <img
              ref={imageRef}
              src={image}
              alt="Generated"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center space-y-3 font-mono">
              <div className="w-12 h-12 mx-auto rounded-full bg-neutral-900 flex items-center justify-center">
                <IoSparkles className="w-5 h-5 text-neutral-300" />
              </div>
              <p className="text-neutral-500 text-xs">
                {loading ? "Generating image..." : "Your image will appear here"}
              </p>
            </div>
          )}
        </div>

        {/* Unified Control Bar */}
        <form
          onSubmit={generateImage}
          className="w-full max-w-3xl flex items-stretch gap-2
          bg-black/70 border border-neutral-800 rounded-xl
          p-2 backdrop-blur-xl"
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A futuristic city floating above clouds..."
            className="flex-1 resize-none px-3 py-2 rounded-lg
            bg-black/60 border border-neutral-800
            text-neutral-100 text-sm font-mono
            placeholder:text-neutral-600
            focus:outline-none focus:ring-2 focus:ring-neutral-700
            hover:border-white/40 transition"
          />

          {/* Generate */}
          <button
            type="submit"
            disabled={loading}
            className="px-4 rounded-lg flex items-center justify-center
            bg-white text-black font-semibold
            disabled:opacity-50 transition"
          >
            {loading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <RiAiGenerate className="w-4 h-4" />
            )}
          </button>

          {/* Actions */}
          {image && (
            <>
              <Divider />
              <IconButton onClick={downloadImage} icon={Download} />
              <IconButton onClick={generateImage} icon={RotateCcw} />
            </>
          )}
        </form>

        {error && (
          <div className="mt-3 max-w-3xl w-full
            rounded-lg border border-red-800 bg-red-900/30
            px-3 py-2 text-xs font-mono text-red-300">
            Error: {error}
          </div>
        )}
      </main>
    </div>
  )
}

function IconButton({ onClick, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 flex items-center justify-center
      text-neutral-300 hover:bg-neutral-900
      rounded-lg transition"
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}

function Divider() {
  return <div className="w-px bg-neutral-800 mx-1" />
}