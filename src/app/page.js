"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ImageUploader } from "@/components/image-uploader"
import { ImageAnalysis } from "@/components/image-analysis"
import { ModelSelector } from "@/components/model-selector"
import * as tf from "@tensorflow/tfjs"

export default function Home() {
  const [image, setImage] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedModel, setSelectedModel] = useState("xray")
  const [model, setModel] = useState(null)

  useEffect(() => {
    async function loadModel() {
      try {
        await tf.ready()
        const loadedModel = await tf.loadLayersModel("/models/model.json")
        setModel(loadedModel)
      } catch (err) {
        console.error("Failed to load model:", err)
        setError("Failed to load AI model. Please try again later.")
      }
    }
    loadModel()
  }, [])

  const handleImageSelect = async (imageData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageData,
          modelType: selectedModel,
        }),
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const result = await response.json()
      if (result.error) {
        throw new Error(result.error)
      }

      // Generate client-side heatmap
      const heatmap = await generateHeatmap(imageData, model)

      setImage(imageData)
      setAnalysis({ ...result, heatmap })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze image")
    } finally {
      setIsLoading(false)
    }
  }

  async function generateHeatmap(imageData, model) {
    if (!model) return null

    const img = new Image()
    img.src = imageData
    await new Promise((resolve) => {
      img.onload = resolve
    })

    const tensor = tf.browser.fromPixels(img).resizeBilinear([224, 224]).toFloat().div(tf.scalar(255)).expandDims()

    const lastConvLayer = model.getLayer("conv5_block3_out")
    const heatmapModel = tf.model({ inputs: model.inputs, outputs: [model.output, lastConvLayer.output] })

    const [predictions, lastConvLayerOutput] = heatmapModel.predict(tensor)
    const argmax = predictions.argMax(1)
    const classActivationMap = tf.matMul(
      lastConvLayerOutput.squeeze([0]),
      model.getLayer("predictions").getWeights()[0],
    )
    const heatmap = classActivationMap.gather(argmax, 1).squeeze().div(classActivationMap.max())

    const heatmapData = await tf.browser.toPixels(heatmap.mul(255).cast("int32").reshape([224, 224, 1]))
    const canvas = document.createElement("canvas")
    canvas.width = 224
    canvas.height = 224
    const ctx = canvas.getContext("2d")
    const heatmapImageData = new ImageData(heatmapData, 224, 224)
    ctx.putImageData(heatmapImageData, 0, 0)

    return canvas.toDataURL()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            Advanced Medical Image Analysis with TensorFlow.js
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Upload medical images for instant AI analysis with heatmap visualization using TensorFlow.js. Supports
            X-rays, MRIs, and mammograms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <div className="space-y-6">
              <ModelSelector selectedModel={selectedModel} onModelSelect={setSelectedModel} />
              <ImageUploader onImageSelect={handleImageSelect} isLoading={isLoading} error={error} />
            </div>
          </Card>

          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <ImageAnalysis image={image} analysis={analysis} isLoading={isLoading} modelType={selectedModel} />
          </Card>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </main>
  )
}

