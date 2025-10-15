"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Calendar, Clock, Plus } from "lucide-react";

import { PieChart, Pie, Label } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const moods = [
  { label: "Happy", icon: "😊" },
  { label: "Sad", icon: "😞" },
  { label: "Anxious", icon: "😟" },
  { label: "Angry", icon: "😡" },
  { label: "Bored", icon: "😒" },
  { label: "Irritated", icon: "😤" },
  { label: "Moody", icon: "😔" },
  { label: "Sensitive", icon: "🥺" },
  { label: "Tired", icon: "😴" },
  { label: "Loved", icon: "😍" },
];

const moodChartData = [
  { type: "Happy", value: 70, fill: "#FFC0CB" },
  { type: "Sensitive", value: 20, fill: "#B55B77" },
  { type: "Bored", value: 10, fill: "#F2F2F2" }
];

const moodChartConfig = {
  value: { label: "Persentase Mood" },
  Happy: { label: "Happy", color: "#FFC0CB" },
  Sensitive: { label: "Sensitive", color: "#B55B77" },
  Bored: { label: "Bored", color: "#F2F2F2" }
};

const MoodSelector = () => (
  <div className="flex flex-wrap gap-x-6 gap-y-4 py-3 w-full">
    {moods.map((mood) => (
      <div key={mood.label} className="text-center">
        <p className="text-3xl">{mood.icon}</p>
        <span className="text-sm text-gray-600">{mood.label}</span>
      </div>
    ))}
  </div>
);

export default function DashboardDefault() {
  const totalMoodEntries = 7;

  const mainMood = moodChartData[0];

  return (
    <div className="p-8 space-y-8 min-h-screen bg-[#F8F8F8]">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold text-secondary">DASHBOARD</h1>
        <p className="text-gray-600">Hi, Wishing you a calm and happy day.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-md h-full">
            <CardHeader>
              <CardTitle className="text-2xl text-secondary">Today's Mood & Journal</CardTitle>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                30 September 2025
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="font-medium">Select the mood that best fits your day.</p>
                <MoodSelector />
              </div>

              <div className="space-y-2">
                <p className="font-medium">Want to add more details?</p>
                <Textarea
                  placeholder="Write about your day, your feelings, or anything on your mind..."
                  className="min-h-[120px] bg-gray-50 resize-none"
                />
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-base font-semibold rounded-full"
              >
                Save Today's Entry
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-md w-full h-full">
            <CardHeader>
              <CardTitle className="text-2xl text-secondary">Mood Recap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <Button variant="outline" size="sm" className="bg-primary/10 text-primary border-primary">Week</Button>
                <Button variant="outline" size="sm" className="text-gray-600">Month</Button>
                <Button variant="outline" size="sm" className="text-gray-600">Year</Button>
              </div>
              <div className="flex items-start justify-center w-full">
                <div className="space-y-10 flex flex-col items-start w-full">
                  <div>
                    <p className="text-sm text-gray-500">Total moods</p>
                    <p className="text-4xl font-bold">{totalMoodEntries}</p>
                  </div>
                  <div className="w-[220px] h-[250px] relative">
                    <ChartContainer
                      config={moodChartConfig}
                      className="aspect-square w-full h-full"
                    >
                      <PieChart width={220} height={250} margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

                        <Pie
                          data={moodChartData}
                          dataKey="value"
                          nameKey="type"
                          innerRadius={70}
                          outerRadius={100}
                          stroke="none"
                          paddingAngle={2}
                        >
                          <Label
                            value={`${mainMood.value}%`}
                            position="center"
                            className="fill-gray-800 text-2xl font-bold"
                          />
                          <Label
                            value={mainMood.type}
                            position="center"
                            dy={22}
                            className="fill-gray-500 text-sm"
                          />
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </div>
                </div>
                <ul className="text-sm space-y-1 pt-2">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FFC0CB]"></span> Happy</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#B55B77]"></span> Sensitive</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#F2F2F2] border"></span> Bored</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card className="shadow-md h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-2xl">Today's affirmations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-primary text-3xl font-bold text-center">"I am worthy of good things and deserve comfort and prosperity".</p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="shadow-md h-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Today's Nutrition Focus</CardTitle>
              <CardDescription>
                Essential for preventing anemia and supporting your baby's blood development.
              </CardDescription>
              <p className="text-sm text-secondary pt-2">
                Try adding one of these to your meals today:
              </p>
            </CardHeader>
            <CardContent className="space-y-4 h-full">
              <div className="flex gap-2 items-center justify-start">
                <Button variant="secondary" className="w-1/4 bg-[#9FE2BF] text-white hover:bg-[#8CD8A7]">Spinach</Button>
                <Button variant="secondary" className="w-1/4 bg-[#F4A460] text-white hover:bg-[#E9967A]">Lean Meat</Button>
                <Button variant="secondary" className="w-1/4 bg-[#DDA0DD] text-white hover:bg-[#C9A0DC]">Lentils</Button>
              </div>
              <div className="flex items-end justify-end h-3/4">
                <Button variant="link" className="text-sm p-0 h-auto text-secondary">
                  Explore More Healthy Foods
                  <ArrowRight className="mt-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}