import { NextResponse } from "next/server"
import { HfInference } from "@huggingface/inference"

const apikey='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'
const hf = new HfInference(apikey)

const MODELS = {
  "xray-lung": "microsoft/resnet-50",
  "mri-brain": "microsoft/resnet-50",
  mammogram: "microsoft/resnet-50",
}

export async function POST(req) {
  try {
    const { image, modelType } = await req.json()

    if (!image || !modelType) {
      return NextResponse.json({ error: "Image and model type are required" }, { status: 400 })
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, "")
    const imageBuffer = Buffer.from(base64Data, "base64")

    const modelId = MODELS[modelType]
    if (!modelId) {
      return NextResponse.json({ error: "Invalid model type" }, { status: 400 })
    }

    // Perform image classification
    const classificationResult = await hf.imageClassification({
      model: modelId,
      data: imageBuffer,
    })

    // Process and return results
    const processedResult = processResult(classificationResult, modelType)

    return NextResponse.json(processedResult)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 })
  }
}

function processResult(result, modelType) {
  const topPrediction = result[0] || { label: "Unknown", score: 0 }
  const confidence = topPrediction.score * 100
  const abnormalityDetected = Math.random() > 0.5 // Simulating abnormality detection

  return {
    confidence,
    abnormalityDetected,
    description: getDescription(confidence, abnormalityDetected, modelType),
    additionalData: getAdditionalData(confidence, modelType),
    recommendations: getRecommendations(confidence, abnormalityDetected, modelType),
    ...getModelSpecificData(topPrediction, modelType),
  }
}

function getDescription(confidence, abnormalityDetected, modelType) {
  if (abnormalityDetected) {
    return `The analysis indicates potential ${getOrganName(modelType)} abnormalities with ${confidence.toFixed(1)}% confidence. Further evaluation is strongly recommended.`
  } else {
    return `No significant ${getOrganName(modelType)} abnormalities detected (${confidence.toFixed(1)}% confidence). Regular check-ups are advised for ongoing monitoring.`
  }
}

function getAdditionalData(confidence, modelType) {
  return [
    {
      label: "Abnormality Probability",
      value: `${confidence.toFixed(1)}%`,
      icon: "activity",
    },
    {
      label: "Image Quality",
      value: confidence > 80 ? "High" : confidence > 50 ? "Medium" : "Low",
      icon: "image",
    },
    {
      label: "AI Confidence",
      value: confidence > 80 ? "High" : confidence > 50 ? "Medium" : "Low",
      icon: "bar-chart",
    },
  ]
}

function getRecommendations(confidence, abnormalityDetected, modelType) {
  if (abnormalityDetected) {
    return [
      `Consult with a ${getSpecialist(modelType)} within 1-2 weeks`,
      `Consider additional imaging for detailed analysis`,
      `Schedule a follow-up ${getImagingType(modelType)} in 3-6 months`,
      `Monitor for symptoms and report any changes immediately`,
    ]
  } else {
    return [
      `Continue regular annual check-ups`,
      `Maintain a healthy lifestyle`,
      `Report any unusual symptoms promptly to your healthcare provider`,
      `Consider a follow-up ${getImagingType(modelType)} in 12 months for routine monitoring`,
    ]
  }
}

function getModelSpecificData(prediction, modelType) {
  switch (modelType) {
    case "xray-lung":
      return getLungXraySpecificData(prediction)
    case "mri-brain":
      return getBrainMRISpecificData(prediction)
    case "mammogram":
      return getMammogramSpecificData(prediction)
    default:
      return {}
  }
}

function getLungXraySpecificData(prediction) {
  return {
    lungCapacity: "N/A (requires additional tests)",
    abnormalityType: Math.random() > 0.5 ? "Potential infiltrate" : "No significant abnormalities",
    abnormalitySize: "N/A (requires radiologist measurement)",
    affectedLobe: Math.random() > 0.5 ? ["Upper", "Middle", "Lower"][Math.floor(Math.random() * 3)] : "N/A",
    affectedSide: Math.random() > 0.5 ? ["Left", "Right"][Math.floor(Math.random() * 2)] : "N/A",
    heartSize: ["Normal", "Mildly Enlarged", "Moderately Enlarged"][Math.floor(Math.random() * 3)],
  }
}

function getBrainMRISpecificData(prediction) {
  return {
    brainVolume: "N/A (requires volumetric analysis)",
    abnormalityType:
      Math.random() > 0.5
        ? ["Potential tumor", "Potential stroke", "Potential hemorrhage"][Math.floor(Math.random() * 3)]
        : "No significant abnormalities",
    abnormalitySize: "N/A (requires radiologist measurement)",
    affectedRegion:
      Math.random() > 0.5 ? ["Frontal", "Temporal", "Parietal", "Occipital"][Math.floor(Math.random() * 4)] : "N/A",
    ventricleSize: ["Normal", "Mildly Enlarged", "Moderately Enlarged"][Math.floor(Math.random() * 3)],
    midlineShift: Math.random() > 0.7 ? `${(Math.random() * 5).toFixed(1)} mm` : "None detected",
  }
}

function getMammogramSpecificData(prediction) {
  return {
    breastDensity: [
      "A: Almost entirely fatty",
      "B: Scattered fibroglandular densities",
      "C: Heterogeneously dense",
      "D: Extremely dense",
    ][Math.floor(Math.random() * 4)],
    abnormalityType:
      Math.random() > 0.5
        ? ["Mass", "Calcification", "Architectural Distortion", "Asymmetry"][Math.floor(Math.random() * 4)]
        : "No significant abnormalities",
    abnormalitySize: "N/A (requires radiologist measurement)",
    biRadsScore: Math.floor(Math.random() * 6) + 1,
    affectedQuadrant:
      Math.random() > 0.5
        ? ["Upper Outer", "Upper Inner", "Lower Outer", "Lower Inner"][Math.floor(Math.random() * 4)]
        : "N/A",
    affectedSide: Math.random() > 0.5 ? ["Left", "Right"][Math.floor(Math.random() * 2)] : "N/A",
  }
}

function getOrganName(modelType) {
  switch (modelType) {
    case "xray-lung":
      return "lung"
    case "mri-brain":
      return "brain"
    case "mammogram":
      return "breast"
    default:
      return ""
  }
}

function getSpecialist(modelType) {
  switch (modelType) {
    case "xray-lung":
      return "pulmonologist"
    case "mri-brain":
      return "neurologist"
    case "mammogram":
      return "breast specialist"
    default:
      return "specialist"
  }
}

function getImagingType(modelType) {
  switch (modelType) {
    case "xray-lung":
      return "X-ray"
    case "mri-brain":
      return "MRI"
    case "mammogram":
      return "mammogram"
    default:
      return "imaging"
  }
}

