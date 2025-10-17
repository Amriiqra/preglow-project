import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Camera } from "lucide-react";
import Image from "next/image";

export default function ImageUploadPreview({ imageFile, onImageChange, onRemoveImage }) {
    const previewUrl = imageFile ? URL.createObjectURL(imageFile) : null;

    React.useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <div className="grid gap-3">
            <Label htmlFor="image-upload">Image (Optional)</Label>

            {!imageFile && (
                <Label
                    htmlFor="image-upload"
                    className="cursor-pointer flex items-center justify-center space-x-2 p-3 border border-dashed border-gray-400 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                    <Camera className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Click here to upload photo</span>
                </Label>
            )}

            <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="sr-only"
                disabled={!!imageFile}
            />

            {previewUrl && (
                <div className="relative w-40 h-40 mt-2 border border-gray-300 rounded-lg overflow-hidden">
                    <Image
                        src={previewUrl}
                        alt="Image Preview"
                        fill
                        objectFit="cover"
                        objectPosition="center"
                    />
                    <Button
                        onClick={onRemoveImage}
                        size="icon"
                        variant="destructive"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};