import { useEffect, useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"

export function ImageAnalysis({ image, analysis, isLoading, modelType }) {
  const [confidence, setConfidence] = useState(0)

  useEffect(() => {
    if (analysis?.confidence) {
      const timer = setTimeout(() => {
        setConfidence(analysis.confidence * 100)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [analysis])

  if (!image && !isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        <p>Upload an image to begin analysis</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Analysis Results</h2>

      {image && (
        <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-700">
          <Image src={image || "/placeholder.svg"} alt="Uploaded medical image" layout="fill" objectFit="contain" />
        </div>
      )}

      {isLoading && (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p className="text-sm text-gray-400">Analyzing image...</p>
          </div>
          <Progress value={confidence} className="h-2" />
        </div>
      )}

      {analysis && !isLoading && (
        <Card className="p-4 bg-gray-800/50 border-gray-700">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Detection Confidence</span>
              <span className="text-teal-400">{confidence.toFixed(1)}%</span>
            </div>
            <Progress value={confidence} className="h-2" />

            <div className="space-y-2">
              <h3 className="font-medium">Findings</h3>
              <p className="text-sm text-gray-300">{analysis.description}</p>
              <p className="text-xs text-gray-400 mt-2">Classification: {analysis.label}</p>
            </div>

            {analysis.heatmap && (
              <div className="space-y-2">
                <h3 className="font-medium">Heatmap Visualization</h3>
                <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-700">
                  <Image
                    src={analysis.heatmap || "/placeholder.svg"}
                    alt="Analysis heatmap"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Heatmap shows areas of interest identified by the AI model.
                </p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

