"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ImageUploader } from "@/components/image-uploader"
import { ImageAnalysis } from "@/components/image-analysis"
import { ModelSelector } from "@/components/model-selector"

const MODELS = {
  "xray-lung-cancer": {
    name: "Lung Cancer X-Ray",
    description: "Specialized for detecting lung cancer in chest X-rays",
    accuracy: "97%",
  },
  "mri-brain-cancer": {
    name: "Brain Cancer MRI",
    description: "Optimized for brain tumor detection in MRI scans",
    accuracy: "96%",
  },
}

export default function Home() {
  const [image, setImage] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedModel, setSelectedModel] = useState("xray-lung-cancer")

  const handleImageSelect = async (imageData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Check if the image is a medical image
      const isMedicalImage = await checkMedicalImage(imageData)
      if (!isMedicalImage) {
        throw new Error("The uploaded image does not appear to be a medical image. Please upload an X-ray or MRI scan.")
      }

      const result = await analyzeImage(imageData, selectedModel)
      setImage(imageData)
      setAnalysis(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze image")
    } finally {
      setIsLoading(false)
    }
  }

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

        for (let i = 0; i < data.length; i += 4) {
          if (data[i] !== data[i + 1] || data[i] !== data[i + 2]) {
            resolve(false) // Not grayscale, likely not a medical image
            return
          }
        }
        resolve(true)
      }
      img.src = imageData
    })
  }

  async function analyzeImage(imageData, modelType) {
    // In a real-world scenario, you would send the image to your backend API
    // Here, we're simulating an API call with mock data
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API delay

    const cancerProbability = Math.random()
    const confidence = cancerProbability * 100

    return {
      confidence,
      label: cancerProbability > 0.5 ? "Cancer Detected" : "No Cancer Detected",
      description: getDescription(cancerProbability, modelType),
      additionalData: getAdditionalData(cancerProbability, modelType),
    }
  }

  function getDescription(probability, modelType) {
    const threshold = 0.5
    if (modelType === "xray-lung-cancer") {
      return probability > threshold
        ? "The analysis indicates a high likelihood of lung cancer. Immediate consultation with a specialist is strongly recommended for further evaluation and potential biopsy."
        : "No significant indicators of lung cancer detected. However, regular check-ups are advised for ongoing monitoring."
    } else {
      return probability > threshold
        ? "The analysis suggests the presence of a brain tumor. Urgent consultation with a neurologist is recommended for further diagnostic procedures, potentially including a biopsy."
        : "No significant indicators of brain tumors detected. Regular follow-ups are recommended for continuous monitoring of brain health."
    }
  }

  function getAdditionalData(probability, modelType) {
    const data = [
      {
        label: "Cancer Probability",
        value: `${(probability * 100).toFixed(2)}%`,
        icon: "activity",
      },
      {
        label: "Confidence Level",
        value:
          probability > 0.8 || probability < 0.2 ? "High" : probability > 0.6 || probability < 0.4 ? "Medium" : "Low",
        icon: "bar-chart",
      },
    ]

    if (modelType === "xray-lung-cancer") {
      data.push(
        {
          label: "Affected Lung Area",
          value: probability > 0.5 ? `${(Math.random() * 30 + 10).toFixed(1)}%` : "N/A",
          icon: "lungs",
        },
        {
          label: "Nodule Size (if detected)",
          value: probability > 0.5 ? `${(Math.random() * 2 + 0.5).toFixed(1)} cm` : "N/A",
          icon: "circle",
        },
      )
    } else {
      data.push(
        {
          label: "Tumor Size (if detected)",
          value: probability > 0.5 ? `${(Math.random() * 3 + 1).toFixed(1)} cm` : "N/A",
          icon: "circle",
        },
        {
          label: "Affected Brain Region",
          value:
            probability > 0.5 ? ["Frontal", "Temporal", "Parietal", "Occipital"][Math.floor(Math.random() * 4)] : "N/A",
          icon: "brain",
        },
      )
    }

    return data
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            Advanced Cancer Detection in Medical Images
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Upload X-rays or MRI scans for instant AI-powered cancer detection with detailed analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <div className="space-y-6">
              <ModelSelector selectedModel={selectedModel} onModelSelect={setSelectedModel} models={MODELS} />
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

