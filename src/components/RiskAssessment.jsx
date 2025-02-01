import { Progress } from "@/components/ui/progress"



export function RiskAssessment({ riskLevel }) {
  const getRiskPercentage = (level) => {
    switch (level) {
      case "Low":
        return 33
      case "Medium":
        return 66
      case "High":
        return 100
      default:
        return 0
    }
  }

  const getRiskColor = (level) => {
    switch (level) {
      case "Low":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "High":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-2">
        <span>Risk Level:</span>
        <span className="font-bold">{riskLevel}</span>
      </div>
      <Progress value={getRiskPercentage(riskLevel)} className={`h-2 ${getRiskColor(riskLevel)}`} />
    </div>
  )
}

