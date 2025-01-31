import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const MODELS = [
  {
    id: "xray",
    name: "Chest X-Ray",
    description: "Specialized for detecting lung abnormalities",
    accuracy: "95%",
  },
  {
    id: "mri",
    name: "Brain MRI",
    description: "Optimized for brain tumor detection",
    accuracy: "93%",
  },
  {
    id: "mammogram",
    name: "Mammogram",
    description: "Enhanced breast cancer detection",
    accuracy: "94%",
  },
]


export function ModelSelector({ selectedModel, onModelSelect }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Analysis Type</h2>
      <RadioGroup value={selectedModel} onValueChange={onModelSelect}>
        <div className="grid gap-4">
          {MODELS.map((model) => (
            <Label
              key={model.id}
              htmlFor={model.id}
              className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors"
            >
              <RadioGroupItem value={model.id} id={model.id} />
              <div className="flex-1">
                <div className="font-medium">{model.name}</div>
                <div className="text-sm text-gray-400">{model.description}</div>
                <div className="text-sm text-teal-400">Accuracy: {model.accuracy}</div>
              </div>
            </Label>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

