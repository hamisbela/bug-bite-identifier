import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Upload, Bug, Loader2, AlertTriangle } from 'lucide-react';
import { analyzeImage } from '../lib/gemini';
import SupportBlock from '../components/SupportBlock';

// Default bug bite image path
const DEFAULT_IMAGE = "/images/bug-bite.webp";

// Default analysis for the bug bite
const DEFAULT_ANALYSIS = `1. Bite Identification:
- Type: Mosquito Bites
- Pattern: Multiple raised, red bumps
- Appearance: Small, round welts with central puncture marks

2. Symptoms & Characteristics:
- Size: 3-5mm in diameter
- Color: Reddish-pink
- Texture: Raised and itchy
- Pattern: Clustered or linear arrangement
- Duration: Typically lasts 3-4 days

3. Potential Risks:
- Severity Level: Mild
- Allergic Reaction Risk: Low
- Disease Transmission Risk: Low in most regions
- Common Complications: Itching, minor swelling
- Warning Signs: None visible in this case

4. Treatment Recommendations:
- Clean the area with soap and water
- Apply calamine lotion or hydrocortisone cream
- Use oral antihistamines for itching
- Apply cold compress to reduce swelling
- Avoid scratching to prevent infection

5. Prevention & Additional Information:
- Use insect repellent when outdoors
- Wear protective clothing in mosquito-prone areas
- Consider using bed nets in endemic regions
- Keep surroundings free of standing water
- Seek medical attention if symptoms worsen or fever develops`;

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load default image and analysis without API call
    const loadDefaultContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(DEFAULT_IMAGE);
        if (!response.ok) {
          throw new Error('Failed to load default image');
        }
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setImage(base64data);
          setAnalysis(DEFAULT_ANALYSIS);
          setLoading(false);
        };
        reader.onerror = () => {
          setError('Failed to load default image');
          setLoading(false);
        };
        reader.readAsDataURL(blob);
      } catch (err) {
        console.error('Error loading default image:', err);
        setError('Failed to load default image');
        setLoading(false);
      }
    };

    loadDefaultContent();
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('Image size should be less than 20MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImage(base64String);
      setError(null);
      handleAnalyze(base64String);
    };
    reader.onerror = () => {
      setError('Failed to read the image file. Please try again.');
    };
    reader.readAsDataURL(file);

    // Reset the file input so the same file can be selected again
    e.target.value = '';
  }, []);

  const handleAnalyze = async (imageData: string) => {
    setLoading(true);
    setError(null);
    const bugBitePrompt = "Analyze this bug bite/sting image and provide the following information:\n1. Bite identification (type of insect, pattern, appearance)\n2. Symptoms & characteristics (size, color, texture, duration)\n3. Potential risks (severity, allergic reactions, disease transmission)\n4. Treatment recommendations\n5. Prevention & additional information\n\nIMPORTANT: If you notice any severe symptoms or concerning patterns, recommend immediate medical attention.";
    try {
      const result = await analyzeImage(imageData, bugBitePrompt);
      setAnalysis(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze image. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatAnalysis = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Remove any markdown-style formatting
      const cleanLine = line.replace(/[*_#`]/g, '').trim();
      if (!cleanLine) return null;

      // Format section headers (lines starting with numbers)
      if (/^\d+\./.test(cleanLine)) {
        return (
          <div key={index} className="mt-8 first:mt-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {cleanLine.replace(/^\d+\.\s*/, '')}
            </h3>
          </div>
        );
      }
      
      // Format list items with specific properties
      if (cleanLine.startsWith('-') && cleanLine.includes(':')) {
        const [label, ...valueParts] = cleanLine.substring(1).split(':');
        const value = valueParts.join(':').trim();
        return (
          <div key={index} className="flex gap-2 mb-3 ml-4">
            <span className="font-semibold text-gray-800 min-w-[120px]">{label.trim()}:</span>
            <span className="text-gray-700">{value}</span>
          </div>
        );
      }
      
      // Format regular list items
      if (cleanLine.startsWith('-')) {
        return (
          <div key={index} className="flex gap-2 mb-3 ml-4">
            <span className="text-gray-400">•</span>
            <span className="text-gray-700">{cleanLine.substring(1).trim()}</span>
          </div>
        );
      }

      // Regular text
      return (
        <p key={index} className="mb-3 text-gray-700">
          {cleanLine}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <div className="bg-gray-50 py-6 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Free Bug Bite Identifier</h1>
          <p className="text-base sm:text-lg text-gray-600">Upload a photo of your bug bite or sting for instant identification and treatment advice</p>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-12">
          <div className="flex flex-col items-center justify-center mb-6">
            <label 
              htmlFor="image-upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <Upload className="h-5 w-5" />
              Upload Bite Photo
              <input
                ref={fileInputRef}
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleImageUpload}
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">PNG, JPG or JPEG (MAX. 20MB)</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {loading && !image && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="animate-spin h-8 w-8 text-green-600" />
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          )}

          {image && (
            <div className="mb-6">
              <div className="relative rounded-lg mb-4 overflow-hidden bg-gray-100">
                <img
                  src={image}
                  alt="Bug bite preview"
                  className="w-full h-auto max-h-[500px] object-contain mx-auto"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnalyze(image)}
                  disabled={loading}
                  className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Bug className="-ml-1 mr-2 h-5 w-5" />
                      Identify Bite
                    </>
                  )}
                </button>
                <button
                  onClick={triggerFileInput}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Another Photo
                </button>
              </div>
            </div>
          )}

          {analysis && (
            <div className="bg-gray-50 rounded-lg p-6 sm:p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Bite Analysis Results</h2>
              <div className="text-gray-700">
                {formatAnalysis(analysis)}
              </div>
              <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-yellow-800 font-semibold">⚠️ Important Medical Disclaimer</h3>
                    <p className="text-yellow-700 mt-1">
                      While our tool provides helpful information about bug bites and stings, it should not replace professional medical advice. If you experience severe symptoms, allergic reactions, or are concerned about your bite, please seek immediate medical attention.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <SupportBlock />

        <div className="prose max-w-none my-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Free Bug Bite Identifier: Your Trusted Resource for Insect Bite Analysis</h2>
          
          <p>Welcome to our free bug bite identifier tool, powered by advanced artificial intelligence technology. This innovative tool helps you identify insect bites and stings, understand their potential risks, and get appropriate treatment recommendations quickly and easily.</p>

          <h3>How Our Free Bug Bite Identifier Works</h3>
          <p>Our tool uses sophisticated AI to analyze photos of bug bites and stings, providing comprehensive information about the likely culprit, potential risks, and recommended treatments. Simply upload a clear photo of the bite or sting, and our AI will help you understand what you're dealing with.</p>

          <h3>Key Features of Our Bug Bite Identifier</h3>
          <ul>
            <li>Instant bite/sting identification</li>
            <li>Detailed symptom analysis</li>
            <li>Risk assessment information</li>
            <li>Treatment recommendations</li>
            <li>Prevention tips</li>
            <li>100% free to use</li>
          </ul>

          <h3>When to Use Our Bug Bite Identifier</h3>
          <ul>
            <li>Identifying unknown insect bites</li>
            <li>Assessing bite severity</li>
            <li>Getting treatment recommendations</li>
            <li>Understanding potential risks</li>
            <li>Learning prevention methods</li>
          </ul>

          <div className="bg-yellow-50 p-6 rounded-lg my-8">
            <h3 className="text-yellow-800">⚠️ Important Medical Disclaimer</h3>
            <p className="text-yellow-700">While our tool provides helpful information about bug bites and stings, it should not replace professional medical advice. If you experience severe symptoms, allergic reactions, or are concerned about your bite, please seek immediate medical attention.</p>
          </div>

          <p>Try our free bug bite identifier today and get instant insights about your insect bites and stings! No registration required - just upload a photo and get the information you need.</p>
        </div>

        <SupportBlock />
      </div>
    </div>
  );
}