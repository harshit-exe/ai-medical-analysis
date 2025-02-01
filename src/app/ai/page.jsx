"use client"

import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ImageUploader } from "@/components/image-uploader"
import { ImageAnalysis } from "@/components/image-analysis"
import { ModelSelector } from "@/components/model-selector"
import { AnalysisInfographic } from "@/components/analysis-infographic"

const MODELS = {
  "xray-lung": {
    name: "Lung X-Ray Analysis",
    description: "Detects lung abnormalities, including pneumonia",
    accuracy: "95%",
  },
  "mri-brain": {
    name: "Brain MRI Analysis",
    description: "Identifies brain tumors, strokes, and other neurological conditions",
    accuracy: "93%",
  },
  mammogram: {
    name: "Mammogram Analysis",
    description: "Detects breast cancer and other breast abnormalities",
    accuracy: "94%",
  },
}

export default function Home() {
  const [image, setImage] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedModel, setSelectedModel] = useState("xray-lung")

  const handleImageSelect = useCallback(
    async (imageData) => {
      setIsLoading(true)
      setError(null)
      setImage(imageData)

      try {
        const isMedicalImage = await checkMedicalImage(imageData)
        if (!isMedicalImage) {
          throw new Error(
            "The uploaded image does not appear to be a medical image. Please upload an X-ray, MRI, or mammogram.",
          )
        }

        const result = await analyzeImage(imageData, selectedModel)
        setAnalysis(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to analyze image")
        setAnalysis(null)
      } finally {
        setIsLoading(false)
      }
    },
    [selectedModel],
  )

  const handleModelSelect = useCallback((modelId) => {
    setSelectedModel(modelId)
    setAnalysis(null)
  }, [])

  async function checkMedicalImage(imageData) {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        ctx.drawImage(img, 0, 0)
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imgData.data

        let grayscale = true
        for (let i = 0; i < data.length; i += 4) {
          if (Math.abs(data[i] - data[i + 1]) > 5 || Math.abs(data[i] - data[i + 2]) > 5) {
            grayscale = false
            break
          }
        }
        resolve(grayscale)
      }
      img.src = imageData
    })
  }

  async function analyzeImage(imageData, modelType) {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageData, modelType }),
    })

    if (!response.ok) {
      throw new Error("Failed to analyze image")
    }

    return await response.json()
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Advanced Medical Image Analysis</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload X-rays, MRIs, or mammograms for instant AI-powered analysis with detailed insights and infographic
            representation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 bg-gray-50 border-gray-200">
            <div className="space-y-6">
              <ModelSelector selectedModel={selectedModel} onModelSelect={handleModelSelect} models={MODELS} />
              <ImageUploader onImageSelect={handleImageSelect} isLoading={isLoading} error={error} />
            </div>
          </Card>

          <Card className="p-6 bg-gray-50 border-gray-200">
            <ImageAnalysis image={image} analysis={analysis} isLoading={isLoading} modelType={selectedModel} />
          </Card>
        </div>

        {analysis && (
          <Card className="p-6 bg-gray-50 border-gray-200">
            <AnalysisInfographic analysis={analysis} modelType={selectedModel} />
          </Card>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </main>
  )
}

