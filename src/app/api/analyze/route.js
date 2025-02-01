import { NextResponse } from "next/server"
import { HfInference } from "@huggingface/inference"

const apikey = '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'
const hf = new HfInference(apikey)

const MODELS = {
  xray: "keremberke/chest-xray-classification",
  mri: "microsoft/resnet-50",
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

    // Basic check for medical image (this is a simplified example and may need improvement)
    const isMedicalImage = await checkIfMedicalImage(imageBuffer)
    if (!isMedicalImage) {
      return NextResponse.json({ error: "The uploaded image does not appear to be a medical image" }, { status: 400 })
    }

    // Perform image classification
    const classificationResult = await hf.imageClassification({
      model: modelId,
      data: imageBuffer,
    })

    // Process and return results
    const processedResult = processClassificationResult(classificationResult, modelType)

    return NextResponse.json(processedResult)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 })
  }
}

async function checkIfMedicalImage(imageBuffer) {
  // This is a placeholder function. In a real-world scenario, you'd want to implement
  // a more sophisticated check, possibly using another ML model trained to distinguish
  // medical images from non-medical images.
  
  // For now, we'll just check if the image is grayscale, which is common for X-rays and MRIs
  const { ImageData } = await import('canvas')
  const imageData = new ImageData(new Uint8ClampedArray(imageBuffer), 224, 224)
  
  for (let i = 0; i < imageData.data.length; i += 4) {
    if (imageData.data[i] !== imageData.data[i + 1] || imageData.data[i] !== imageData.data[i + 2]) {
      return false
    }
  }
  return true
}

function processClassificationResult(result, modelType) {
  const topPredictions = result.slice(0, 5) // Get top 5 predictions

  let processedResult = {
    predictions: topPredictions.map(pred => ({
      label: pred.label,
      probability: pred.score,
      description: getDescription(pred.label, modelType),
    })),
    modelType: modelType,
    overallAssessment: getOverallAssessment(topPredictions, modelType),
  }

  return processedResult
}

function getDescription(label, modelType) {
  const descriptions = {
    xray: {
      "Normal": "No significant abnormalities detected in the chest X-ray.",
      "Pneumonia": "Possible indicators of pneumonia detected. Consultation recommended.",
      "COVID-19": "Potential indicators of COVID-19 detected. Immediate isolation and testing advised.",
      "Tuberculosis": "Possible signs of tuberculosis. Further tests recommended.",
      "Lung Cancer": "Potential indicators of lung cancer detected. Immediate consultation required.",
    },
    mri: {
      "Normal": "No significant abnormalities detected in the brain MRI.",
      "Tumor": "Potential brain tumor detected. Immediate consultation required.",
      "Stroke": "Possible signs of a past or recent stroke. Further evaluation needed.",
      "Multiple Sclerosis": "Indicators consistent with multiple sclerosis. Neurological consultation advised.",
      "Alzheimer's": "Patterns suggestive of Alzheimer's disease. Cognitive assessment recommended.",
    },
  }

  return descriptions[modelType]?.[label] || "Unrecognized pattern detected. Please consult with a healthcare professional for interpretation."
}

function getOverallAssessment(predictions, modelType) {
  const topPrediction = predictions[0]
  
  if (topPrediction.score < 0.5) {
    return "The analysis is inconclusive. Please consult with a healthcare professional for a thorough evaluation."
  }

  if (modelType === "xray") {
    if (topPrediction.label === "Normal") {
      return "The X-ray appears to be normal, but please consult with a healthcare professional for a definitive diagnosis."
    } else {
      return `The X-ray shows potential indicators of ${topPrediction.label.toLowerCase()}. Further examination and professional medical advice is strongly recommended.`
    }
  } else if (modelType === "mri") {
    if (topPrediction.label === "Normal") {
      return "The MRI appears to be normal, but please consult with a healthcare professional for a definitive diagnosis."
    } else {
      return `The MRI shows potential indicators of ${topPrediction.label.toLowerCase()}. Further examination and professional medical advice is strongly recommended.`
    }
  }

  return "Unable to provide an overall assessment. Please consult with a healthcare professional."
}
