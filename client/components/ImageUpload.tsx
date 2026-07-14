import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Upload, X, Link as LinkIcon } from 'lucide-react';
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';
import firebase from '../lib/firebase';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  placeholder?: string;
  /** Firebase Storage folder prefix, e.g. "uploads/gallery/" */
  storagePrefix?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label,
  placeholder,
  storagePrefix = "uploads/blog/",
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string>(value);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(value);
    setError(null);
  }, [value]);

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
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    setError(null);
    setUploading(true);
    setUploadProgress(0);

    // Show an immediate local preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
    const prefix = storagePrefix.endsWith('/') ? storagePrefix : `${storagePrefix}/`;
    const fileRef = storageRef(firebase.storage, `${prefix}${Date.now()}-${safeName}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(progress);
      },
      (uploadError) => {
        console.error('Image upload failed', uploadError);
        setError('Upload failed. Please try again.');
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setPreview(downloadURL);
          onChange(downloadURL);
        } catch (urlError) {
          console.error('Failed to get download URL', urlError);
          setError('Unable to retrieve image URL. Please retry.');
        } finally {
          setUploading(false);
        }
      }
    );
  };

  const handleUrlChange = (url: string) => {
    setPreview(url);
    setError(null);
    setUploadProgress(0);
    onChange(url);
  };

  const clearImage = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setUploadProgress(0);
    setError(null);
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
                className="w-full h-48 object-contain bg-black/5 rounded-lg"
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
              {uploading && (
                <div className="absolute inset-x-4 bottom-4 bg-white/80 rounded-full overflow-hidden shadow-sm">
                  <div
                    className="h-2 bg-[#F84988] transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                  <p className="text-xs text-center mt-1 text-gray-700">
                    Uploading… {uploadProgress}%
                  </p>
                </div>
              )}
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
        Images are uploaded to Firebase Storage and the public URL is saved with your post. Ensure you have internet connectivity while uploading.
      </p>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
