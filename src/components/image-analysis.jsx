import { useEffect, useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, Activity, BarChart2, ImageIcon } from "lucide-react"

const IconMap = {
  activity: Activity,
  "bar-chart": BarChart2,
  image: ImageIcon,
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
      <h2 className="text-xl font-semibold text-gray-800">Image Analysis</h2>

      {image && (
        <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-300">
          <Image src={image || "/placeholder.svg"} alt="Uploaded medical image" layout="fill" objectFit="contain" />
        </div>
      )}

      {isLoading && (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            <p className="text-sm text-gray-600">Analyzing image...</p>
          </div>
          <Progress value={confidence} className="h-2" />
        </div>
      )}

      {analysis && !isLoading && (
        <Card className="p-4 bg-white border-gray-200">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Analysis Complete</span>
              <span className="text-blue-600 font-semibold">{confidence.toFixed(1)}% Confidence</span>
            </div>
            <Progress value={confidence} className="h-2" />
            <p className="text-sm text-gray-600">
              {analysis.abnormalityDetected
                ? "Potential abnormalities detected. Please refer to the detailed infographic below for more information."
                : "No significant abnormalities detected. Please refer to the detailed infographic below for more information."}
            </p>
            {analysis.additionalData && (
              <div className="grid grid-cols-2 gap-2">
                {analysis.additionalData.map((item, index) => {
                  const Icon = IconMap[item.icon]
                  return (
                    <div key={index} className="flex items-center space-x-2">
                      {Icon && <Icon className="h-4 w-4 text-blue-500" />}
                      <span className="text-sm text-gray-600">
                        {item.label}: {item.value}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

