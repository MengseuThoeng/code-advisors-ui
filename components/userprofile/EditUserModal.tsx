"use client";
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Save, Upload, Palette } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    name: string;
    username: string;
    bio: string;
    location: string;
    email: string;
    website: string;
  };
  onSave: (data: any) => void;
}

export default function EditUserModal({ isOpen, onClose, userData, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState(userData);
  const [bgColor, setBgColor] = useState("#000040");

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, bgColor });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const colorOptions = [
    "#000040", "#CD3937", "#1e40af", "#059669", "#7c3aed", 
    "#dc2626", "#ea580c", "#ca8a04", "#4338f5", "#be185d"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cover & Profile Image Section */}
          <div className="space-y-4">
            <div 
              className="h-32 rounded-lg relative overflow-hidden"
              style={{ backgroundColor: bgColor }}
            >
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute bottom-4 left-4">
                <Avatar className="w-20 h-20 border-4 border-white">
                  <AvatarImage src="/user.jpg" alt={formData.name} />
                  <AvatarFallback className="text-lg font-bold">
                    {formData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <Button 
                type="button"
                size="sm" 
                className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
            </div>

            {/* Color Picker */}
            <div>
              <Label className="text-sm font-medium mb-2 flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Cover Color
              </Label>
              <div className="flex space-x-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${
                      bgColor === color ? 'border-gray-900' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setBgColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="@johndoe"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="johndoe.dev"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="john.doe@example.com"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}