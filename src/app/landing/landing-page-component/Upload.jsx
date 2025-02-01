import { UploadIcon } from "lucide-react"

export default function Upload() {
  return (
    <section id="upload" className="py-12 md:py-24 bg-blue-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Upload Your Scan</h2>
            <p className="text-gray-500 md:text-lg">
              Get fast, accurate AI-powered analysis of your radiology scans. Our platform supports various image
              formats including DICOM, JPEG, and PNG.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadIcon className="w-10 h-10 mb-3 text-blue-400" />
                  <p className="mb-2 text-sm text-blue-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-blue-500">DICOM, JPEG, PNG (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
            <button className="w-full rounded-md bg-blue-600 px-8 py-3 text-white hover:bg-blue-700" type="submit">
              Analyze Scan
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

