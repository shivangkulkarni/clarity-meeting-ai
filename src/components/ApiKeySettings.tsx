
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Eye, EyeOff, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKeySettingsProps {
  onApiKeyChange: (apiKey: string) => void;
}

const ApiKeySettings = ({ onApiKeyChange }: ApiKeySettingsProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      onApiKeyChange(savedApiKey);
    } else {
      setIsExpanded(true); // Auto-expand if no API key is saved
    }
  }, [onApiKeyChange]);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key.",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey.startsWith('sk-')) {
      toast({
        title: "Warning",
        description: "OpenAI API keys typically start with 'sk-'. Please verify your key.",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('openai_api_key', apiKey);
    onApiKeyChange(apiKey);
    setIsExpanded(false);
    
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved securely in your browser.",
    });
  };

  const handleClear = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    onApiKeyChange('');
    setIsExpanded(true);
    
    toast({
      title: "API Key Cleared",
      description: "Your API key has been removed.",
    });
  };

  return (
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle 
          className="text-lg font-semibold text-slate-900 flex items-center gap-2 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Settings className="h-5 w-5 text-blue-600" />
          API Configuration
          {apiKey && !isExpanded && (
            <span className="text-sm text-green-600 font-normal">(Configured)</span>
          )}
        </CardTitle>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">OpenAI API Key</Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showApiKey ? "text" : "password"}
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Your API key is stored locally in your browser and never sent to our servers.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Key
            </Button>
            {apiKey && (
              <Button onClick={handleClear} variant="outline">
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ApiKeySettings;
