import { useState } from "react"

const GROQ_API_KEY = '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'
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

export function useGroqAI() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
  
    const callGroqAPI = async (messages) => {
      setIsLoading(true)
      setError(null)
  
      try {
        const response = await fetch(GROQ_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "mixtral-8x7b-32768",
            messages: messages,
            max_tokens: 500,
            temperature: 0.7,
          }),
        })
  
        if (!response.ok) {
          throw new Error(`Failed to call Groq API: ${response.status} ${response.statusText}`)
        }
  
        const data = await response.json()
        return data.choices[0].message.content.trim()
      } catch (error) {
        console.error("Error calling Groq API:", error)
        setError(error.message)
        return "Failed to process request. Please try again."
      } finally {
        setIsLoading(false)
      }
    }
  
    const analyzeCancerRisk = async (symptoms, medicalHistory) => {
      const messages = [
        {
          role: "system",
          content:
            "You are an AI medical assistant specialized in cancer risk assessment. Provide informative and cautious responses.",
        },
        {
          role: "user",
          content: `Based on the following symptoms and medical history, assess the potential cancer risk. Symptoms: ${symptoms}. Medical History: ${medicalHistory}. Provide a brief analysis and recommend next steps.`,
        },
      ]
      return callGroqAPI(messages)
    }
  
    const getGeneralMedicalAdvice = async (query) => {
      const messages = [
        {
          role: "system",
          content:
            "You are an AI medical assistant providing general health advice. Always recommend consulting with a healthcare professional for personalized medical advice.",
        },
        { role: "user", content: query },
      ]
      return callGroqAPI(messages)
    }
  
    const checkSymptoms = async (symptoms) => {
      const messages = [
        {
          role: "system",
          content:
            "You are an AI medical assistant specialized in symptom checking. Provide possible causes and recommend whether medical attention is needed.",
        },
        {
          role: "user",
          content: `Check the following symptoms and provide possible causes: ${symptoms}. Also, indicate if immediate medical attention is recommended.`,
        },
      ]
      return callGroqAPI(messages)
    }
  
    const analyzeExtractedText = async (text) => {
      const messages = [
        {
          role: "system",
          content:
            "You are an AI medical assistant analyzing extracted text from medical documents. Provide a summary and highlight any important information.",
        },
        {
          role: "user",
          content: `Analyze the following extracted text from a medical document and provide a summary of key points: ${text}`,
        },
      ]
      return callGroqAPI(messages)
    }
  
    return { analyzeCancerRisk, getGeneralMedicalAdvice, checkSymptoms, analyzeExtractedText, isLoading, error }
  }
  
