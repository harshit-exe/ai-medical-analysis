import { NextResponse } from "next/server"
import { HfInference } from "@huggingface/inference"

const apikey = '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'
const hf = new HfInference(apikey)

const MODELS = {
  xray: "microsoft/resnet-50",
  mri: "microsoft/resnet-50",
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
    const processedResult = {
      confidence: classificationResult[0]?.score || 0,
      label: classificationResult[0]?.label || "Unknown",
      description: getDescription(classificationResult[0]?.label, modelType),
    }

    return NextResponse.json(processedResult)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 })
  }
}

function getDescription(label, modelType) {
  // Add more detailed descriptions based on model type and label
  const descriptions = {
    xray: {
      normal: "No significant abnormalities detected in the chest X-ray.",
      pneumonia: "Possible indicators of pneumonia detected. Consultation recommended.",
      covid19: "Potential indicators of COVID-19 detected. Immediate isolation and testing advised.",
      tuberculosis: "Possible signs of tuberculosis. Further tests recommended.",
      cancer: "Potential indicators of lung cancer detected. Immediate consultation required.",
    },
    mri: {
      normal: "No significant abnormalities detected in the brain MRI.",
      tumor: "Potential brain tumor detected. Immediate consultation required.",
      stroke: "Possible signs of a past or recent stroke. Further evaluation needed.",
      multiple_sclerosis: "Indicators consistent with multiple sclerosis. Neurological consultation advised.",
      alzheimers: "Patterns suggestive of Alzheimer's disease. Cognitive assessment recommended.",
    },
    mammogram: {
      normal: "No significant abnormalities detected in the mammogram.",
      benign: "Benign findings detected. Regular follow-up recommended.",
      malignant: "Potential indicators of malignancy detected. Immediate biopsy recommended.",
      calcification: "Calcifications observed. May be benign, but follow-up needed.",
      asymmetry: "Asymmetry detected. Additional imaging may be required.",
    },
  }

  return (
    descriptions[modelType]?.[label.toLowerCase()] ||
    "Analysis complete. Please consult with a healthcare professional for interpretation."
  )
}

