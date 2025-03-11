"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AbhaAddress() {
  const router = useRouter();
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/download-card");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Create ABHA Address</CardTitle>
            <CardDescription>
              Choose a unique ABHA address that will be used to access your health
              records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">ABHA Address</Label>
                <div className="relative">
                  <Input
                    id="address"
                    placeholder="yourname"
                    value={address}
                    onChange={(e) => setAddress(e.target.value.toLowerCase())}
                    required
                    className="pr-20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    @abha
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Your ABHA address will be: {address}@abha
                </p>
              </div>
              <Button type="submit" className="w-full">
                Create ABHA Address
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}