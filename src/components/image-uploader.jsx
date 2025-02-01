"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, Loader2 } from "lucide-react"


export function ImageUploader({ onImageSelect, isLoading, error, isDisabled }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            onImageSelect(e.target.result)
          }
        }
        reader.readAsDataURL(file)
      }
    },
    [onImageSelect],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".dicom"],
    },
    maxFiles: 1,
    disabled: isLoading || isDisabled,
  })

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? "border-teal-500 bg-teal-500/10" : "border-gray-600"}
        ${error ? "border-red-500" : ""}
        ${isLoading || isDisabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        {isLoading ? (
          <Loader2 className="h-10 w-10 mx-auto animate-spin text-teal-500" />
        ) : (
          <Upload className="h-10 w-10 mx-auto text-gray-400" />
        )}
        <div>
          <p className="text-sm text-gray-300">
            {isDragActive
              ? "Drop the image here"
              : isDisabled
              ? "Please enter patient information before uploading an image"
              : "Drag and drop an image, or click to select"}
          </p>
          <p className="text-xs text-gray-400 mt-2">Supported formats: JPEG, PNG, DICOM</p>
        </div>
      </div>
    </div>
  )
}

