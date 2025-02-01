import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, BarChart2, Heart, Brain, Scan, Calendar, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AnalysisInfographic({ analysis, modelType }) {
  const [activeTab, setActiveTab] = useState("overview")

  const getIcon = (type) => {
    switch (type) {
      case "xray-lung":
        return <Heart className="w-6 h-6 text-blue-500" />
      case "mri-brain":
        return <Brain className="w-6 h-6 text-purple-500" />
      case "mammogram":
        return <Scan className="w-6 h-6 text-pink-500" />
      default:
        return <Activity className="w-6 h-6 text-gray-500" />
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">Analysis Results</h2>
            <div className="flex items-center space-x-2">
              {getIcon(modelType)}
              <span className="text-lg font-medium">
                {analysis.abnormalityDetected ? "Abnormality Detected" : "No Significant Abnormalities"}
              </span>
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {/* <TabsTrigger value="details">Details</TabsTrigger> */}

              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Abnormality Probability:</span>
                    <span className="font-semibold">{analysis.confidence.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${analysis.confidence}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-600">{analysis.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
        
            <TabsContent value="recommendations">
              <Card>
                <CardContent className="p-4">
                  <ul className="list-disc pl-5 space-y-2">
                    {analysis.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm">
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          {analysis && (
            <div className="flex justify-center space-x-4 mt-6">
              <Button className="flex items-center"
              onClick={() => window.open("/book-appointment", "_blank")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open("/chat-bot", "_blank")}
                className="flex items-center"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with AI Assistant
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function getModelSpecificData(analysis, modelType) {
  switch (modelType) {
    case "xray-lung":
      return {
        lungCapacity: analysis.lungCapacity,
        abnormalityType: analysis.abnormalityType,
        abnormalitySize: analysis.abnormalitySize,
        affectedLobe: analysis.affectedLobe,
        affectedSide: analysis.affectedSide,
        heartSize: analysis.heartSize,
      }
    case "mri-brain":
      return {
        brainVolume: analysis.brainVolume,
        abnormalityType: analysis.abnormalityType,
        abnormalitySize: analysis.abnormalitySize,
        affectedRegion: analysis.affectedRegion,
        ventricleSize: analysis.ventricleSize,
        midlineShift: analysis.midlineShift,
      }
    case "mammogram":
      return {
        breastDensity: analysis.breastDensity,
        abnormalityType: analysis.abnormalityType,
        abnormalitySize: analysis.abnormalitySize,
        biRadsScore: analysis.biRadsScore,
        affectedQuadrant: analysis.affectedQuadrant,
        affectedSide: analysis.affectedSide,
      }
    default:
      return {}
  }
}

function formatLabel(key) {
  return key
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

