import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"



export function ModelSelector({ selectedModel, onModelSelect, models }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Cancer Detection Model</h2>
      <RadioGroup value={selectedModel} onValueChange={onModelSelect}>
        <div className="grid gap-4">
          {Object.entries(models).map(([id, model]) => (
            <Label
              key={id}
              htmlFor={id}
              className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors"
            >
              <RadioGroupItem value={id} id={id} />
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

