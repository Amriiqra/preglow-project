"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { PieChart, Pie, Label } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import * as API from "@/core/services/api";
import { useFormik } from 'formik'
import { toast } from 'sonner';
import useSWR from "swr";
import { cleanPercentage, formatNumber, formatNutritionValue } from "@/config/global";

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

const moodColors = [
  "#FFC0CB",
  "#B55B77",
  "#FFB6C1",
  "#FF69B4",
  "#FFE4E1",
  "#F08080",
  "#CD5C5C",
  "#F4A6C4",
  "#E6B8C9",
  "#D4A5A5",
];

const MoodSelector = ({ selectedMood, onSelectMood }) => (
  <div className="flex flex-wrap lg:gap-x-5 gap-x-4 gap-y-4 py-3 w-full">
    {moods.map((mood) => {
      const isSelected = selectedMood === mood.label;
      return (
        <div
          key={mood.label}
          className={`text-center cursor-pointer p-1 rounded-md transition-all ${isSelected ? 'bg-primary/10 ring-2 ring-primary scale-110' : 'hover:bg-gray-100'
            }`}
          onClick={() => onSelectMood(mood.label)}
        >
          <p className="text-3xl">{mood.icon}</p>
          <span className="text-sm text-gray-600">{mood.label}</span>
        </div>
      );
    })}
  </div>
);

export default function DashboardDefault() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('Today');

  const getMoodData = () => {
    switch (selectedDuration) {
      case 'Week':
        return API.Mood.getWeeklyMood();
      case 'Month':
        return API.Mood.getMonthlyMood();
      default:
        return API.Mood.getDailyMood();
    }
  };

  const {
    data: dataDailyMood,
    isLoading,
    mutate
  } = useSWR(['moodData', selectedDuration], getMoodData);

  const {
    data: dataAffirmation,
  } = useSWR('affirmation', API.Affirmation.getAll);

  const {
    data: dataDailyNutrition,
  } = useSWR('nutrition', API.Nutrition.getDailyNutrition);

  const { moodChartData, moodChartConfig, mainMood } = useMemo(() => {
    if (!dataDailyMood || !dataDailyMood.mood_count || dataDailyMood.mood_count.length === 0) {
      return {
        moodChartData: [],
        moodChartConfig: { value: { label: "Persentase Mood" } },
        mainMood: null
      };
    }

    const apiMoodCounts = dataDailyMood.mood_count;

    const chartData = apiMoodCounts.map((mood, index) => {
      const numericValue = parseFloat(mood.percentage.replace('%', ''));

      return {
        type: mood.category,
        value: numericValue,
        percentageLabel: cleanPercentage(mood.percentage),
        fill: moodColors[index % moodColors.length]
      };
    });

    chartData.sort((a, b) => b.value - a.value);

    const config = {
      value: { label: "Persentase Mood" },
      ...chartData.reduce((acc, mood) => {
        acc[mood.type] = {
          label: mood.type,
          color: mood.fill
        };
        return acc;
      }, {})
    };

    let calculatedMainMood = chartData[0];

    if (calculatedMainMood) {
      calculatedMainMood = {
        ...calculatedMainMood,
        percentageLabel: calculatedMainMood.value > 100 ? '100%' : calculatedMainMood.percentageLabel
      };
    }

    return {
      moodChartData: chartData,
      moodChartConfig: config,
      mainMood: calculatedMainMood
    };
  }, [dataDailyMood]);

  const formik = useFormik({
    initialValues: {
      category: '',
      daily_feelings: ''
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const saveMoodPromise = API.Mood.saveDailyMood(values);

        toast.promise(saveMoodPromise, {
          loading: "Saving your mood...",
          success: (data) => {
            resetForm();
            setSelectedMood(null);
            mutate();
            return data.message || "Mood saved successfully!";
          },
          error: (err) => {
            return `Failed to save mood! ${err.message || "Please try again."}`;
          },
        });

        await saveMoodPromise;
      } catch (error) {
        console.error("Save mood failed:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  React.useEffect(() => {
    if (selectedMood) {
      formik.setFieldValue('category', selectedMood);
    }
  }, [selectedMood]);

  return (
    <div className="p-4 sm:p-8 space-y-8 min-h-screen bg-[#F8F8F8] font-sans">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold text-secondary font-sans">DASHBOARD</h1>
        <p className="text-gray-600">Hi, Wishing you a calm and happy day.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl text-secondary">Today's Mood & Journal</CardTitle>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                {new Date().toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <p className="font-medium">Select the mood that best fits your day.</p>
                  <MoodSelector selectedMood={selectedMood} onSelectMood={setSelectedMood} />
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Want to add more details?</p>
                  <Textarea
                    name="daily_feelings"
                    placeholder="Write about your day, your feelings, or anything on your mind..."
                    className="min-h-[120px] bg-gray-50 resize-none"
                    value={formik.values.daily_feelings}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={formik.isSubmitting || !formik.values.category || !formik.values.daily_feelings}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-base font-semibold rounded-full"
                >
                  {formik.isSubmitting ? 'Saving...' : 'Save Today\'s Entry'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle className="text-2xl text-secondary">Mood Recap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                {['Today', 'Week', 'Month'].map((duration) => (
                  <Button
                    key={duration}
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDuration(duration)}
                    className={
                      selectedDuration === duration
                        ? "bg-primary/10 text-primary border-primary font-semibold"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  >
                    {duration}
                  </Button>
                ))}
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <p className="text-gray-400">Loading mood data...</p>
                </div>
              ) : moodChartData.length === 0 ? (
                <div className="flex items-center justify-center h-[300px]">
                  <p className="text-gray-400">No mood data available</p>
                </div>
              ) : (
                <div className="flex items-start justify-center w-full">
                  <div className="space-y-10 flex flex-col items-start w-full">
                    <div>
                      <p className="text-sm text-black">Total moods</p>
                      <p className="text-4xl font-bold text-secondary">{dataDailyMood?.total_moods || 0}</p>
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
                            {mainMood && (
                              <>
                                <Label
                                  value={`${mainMood.percentageLabel}`}
                                  position="center"
                                  className="fill-black text-4xl font-bold"
                                />
                                <Label
                                  value={mainMood.type}
                                  position="center"
                                  dy={22}
                                  className="fill-gray-500 text-base"
                                />
                              </>
                            )}
                          </Pie>
                        </PieChart>
                      </ChartContainer>
                    </div>
                  </div>
                  <ul className="text-sm space-y-1 pt-2">
                    {moodChartData.map((mood) => (
                      <li key={mood.type} className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: mood.fill }}
                        ></span>
                        {mood.type}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 lg:pb-2">
              <div className="space-y-1">
                <CardTitle className="text-2xl text-secondary">Affirmations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-primary text-2xl lg:text-3xl font-bold text-center text-kaisei lg:pb-0 pb-5">"{dataAffirmation?.affirmation?.text}".</p>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card className="h-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-secondary">Today's Nutrition Report</CardTitle>
              <CardDescription className="text-secondary">
                Try adding one of these to your meals today:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 h-full">
              <div className="space-y-4">
                <div className="grid lg:grid-cols-4 gap-4">
                  <Card className="text-start gap-0 p-4 rounded-md shadow-none text-secondary">
                    <p>Calories Consumed</p>
                    <p className="text-2xl font-medium">{dataDailyNutrition?.totalNutrition?.calories || 0}</p>
                    <p className="text-sm text-green-500">{dataDailyNutrition?.lastNutrition?.calories}</p>
                  </Card>
                  <Card className="text-start gap-0 p-4 rounded-md shadow-none text-secondary">
                    <p>Proteins</p>
                    <p className="text-2xl font-medium">{dataDailyNutrition?.totalNutrition?.protein || 0}</p>
                    <p className="text-sm text-green-500">{dataDailyNutrition?.lastNutrition?.protein}</p>
                  </Card>
                  <Card className="text-start gap-0 p-4 rounded-md shadow-none text-secondary">
                    <p>Carbohydrates</p>
                    <p className="text-2xl font-medium">{formatNutritionValue(dataDailyNutrition?.totalNutrition?.carbs) || 0}</p>
                    <p className="text-sm text-green-500">{formatNutritionValue(dataDailyNutrition?.lastNutrition?.carbs)}</p>
                  </Card>
                  <Card className="text-start gap-0 p-4 rounded-md shadow-none text-secondary">
                    <p>Fats</p>
                    <p className="text-2xl font-medium">{formatNutritionValue(dataDailyNutrition?.totalNutrition?.fat) || 0}</p>
                    <p className="text-sm text-green-500">{formatNutritionValue(dataDailyNutrition?.lastNutrition?.fat)}</p>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}