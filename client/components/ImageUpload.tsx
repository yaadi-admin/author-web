import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Upload, X, Link as LinkIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  placeholder?: string;
}

export default function ImageUpload({ value, onChange, label, placeholder }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      
      // In a real application, you would upload the file to your server/cloud storage
      // For demo purposes, we'll use a placeholder URL
      const placeholderUrl = `https://api.placeholder.com/800x400/${file.name.replace(/\.[^/.]+$/, "")}`;
      onChange(placeholderUrl);
      
      // Note: In production, you would:
      // 1. Upload the file to your storage service (AWS S3, Cloudinary, etc.)
      // 2. Get the public URL from the storage service
      // 3. Call onChange with that URL
    }
  };

  const handleUrlChange = (url: string) => {
    setPreview(url);
    onChange(url);
  };

  const clearImage = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      {/* URL Input */}
      <div className="flex gap-2">
        <Input
          type="url"
          value={value}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder={placeholder || "Enter image URL or drag & drop an image"}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <LinkIcon size={16} />
        </Button>
      </div>

      {/* Drag and Drop Area */}
      <Card 
        className={`relative border-2 border-dashed transition-colors ${
          dragActive ? 'border-[#F84988] bg-[#F84988]/5' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-6">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
                onError={() => setPreview('')}
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={clearImage}
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-600 mb-2">
                Drop an image here, or{' '}
                <button
                  type="button"
                  className="text-[#F84988] hover:text-[#e03a7a] underline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  browse
                </button>
              </p>
              <p className="text-sm text-gray-500">
                Or enter an image URL in the field above
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
      
      {/* Help Text */}
      <p className="text-xs text-gray-500">
        Note: In this demo, uploaded files will be converted to placeholder URLs. 
        In production, implement proper file upload to your storage service.
      </p>
    </div>
  );
}
