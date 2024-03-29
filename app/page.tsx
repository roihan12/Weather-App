"use client";
import CityPicker from "@/components/CityPicker";
import { Card, Divider, Subtitle, Text } from "@tremor/react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#394F68] to-[#183B7E] p-10 flex flex-col justify-center items-center ">
      <Card className="max-w-4xl mx-auto">
        <Text className="text-5xl font-bold text-center mb-10">
          Weather App
        </Text>
        <Subtitle className="text-xl text-center">Powered by Next.js!</Subtitle>

        <Divider className="my-10" />

        <Card className="bg-gradient-to-br from-[#394F68] to-[#183B7E]">
          {/* City Picker */}
          <CityPicker />
        </Card>
      </Card>
    </div>
  );
}
