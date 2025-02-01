import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Upload, Loader2 } from 'lucide-react'
import { createWorker } from 'tesseract.js';

export function ImageUploader({ onTextExtracted }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();

      onTextExtracted(text);
    } catch (err) {
      setError('Failed to extract text from image. Please try again.');
      console.error('OCR Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isLoading}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="flex-1">
          <Button variant="outline" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {isLoading ? 'Processing...' : 'Upload Image'}
          </Button>
        </label>
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </Card>
  );
}
