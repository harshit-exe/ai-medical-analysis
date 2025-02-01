import { useEffect, useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, Activity, BarChart, Circle, Brain, TreesIcon as Lungs } from "lucide-react"

const IconMap = {
  activity: Activity,
  "bar-chart": BarChart,
  circle: Circle,
  brain: Brain,
  lungs: Lungs,
}

export function ImageAnalysis({ image, analysis, isLoading, modelType }) {
  const [confidence, setConfidence] = useState(0)

  useEffect(() => {
    if (analysis?.confidence) {
      const timer = setTimeout(() => {
        setConfidence(analysis.confidence)
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

            <div className="space-y-2">
              <h3 className="font-medium">Additional Data</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                {analysis.additionalData.map((item, index) => {
                  const Icon = IconMap[item.icon]
                  return (
                    <li key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {Icon && <Icon className="h-4 w-4 text-teal-400" />}
                        <span>{item.label}:</span>
                      </div>
                      <span className="font-semibold">{item.value}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

