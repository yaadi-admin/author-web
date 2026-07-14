import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { loginAdmin } from "../lib/admin-auth";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "./ui/use-toast";

interface AdminPasswordProtectionProps {
  onAuthenticated: () => void;
}

const SESSION_DURATION_MINUTES = 120;

export default function AdminPasswordProtection({
  onAuthenticated,
}: AdminPasswordProtectionProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginAdmin(password);

      toast({
        title: "Access Granted",
        description: "Welcome to the admin panel!",
      });

      onAuthenticated();
    } catch (error) {
      toast({
        title: "Access Denied",
        description:
          error instanceof Error ? error.message : "Invalid password. Please try again.",
        variant: "destructive",
      });
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      void handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#F1E6DB] via-[#E0B2F1] to-[#FFE4EE] flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-[#F84988] rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="font-playfair text-2xl text-black">
            Admin Access Required
          </CardTitle>
          <p className="font-helvetica text-black/70 mt-2">
            Please enter your password to access the administration panel
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="font-helvetica text-black font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter admin password"
                  className="pr-10 font-mono"
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#F84988] text-white hover:bg-[#e03a7a] font-helvetica py-3"
              disabled={isLoading || !password.trim()}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </div>
              ) : (
                "Access Admin Panel"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
            <p className="font-helvetica text-xs text-black/50 text-center">
              Secure session remains active for {SESSION_DURATION_MINUTES} minutes
            </p>
            <p className="font-helvetica text-xs text-black/40 text-center">
              Access is verified by the server with an encrypted HttpOnly cookie.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
