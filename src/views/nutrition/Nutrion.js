"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as API from "@/core/services/api";
import useSWR from "swr";
import { BarChart, Bar, AreaChart, Area, XAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { toast } from "sonner";
import { AddMealDialog } from "./AddMealDialog";
import { formatNutritionValue } from "@/config/global";
import { Skeleton } from "@/components/ui/skeleton";
import { NutritionStatsSkeleton } from "@/components/shared/skeleton/NutritionStatsSkeleton";
import { ProductListSkeleton } from "@/components/shared/skeleton/ProductListSkeleton";
import { RecentMealAndChartSkeleton } from "@/components/shared/skeleton/RecentMealAndChartSkeleton";

const MEAL_ICONS = {
    "Breakfast": "🥚",
    "Lunch": "🥗",
    "Dinner": "🍜",
    "Snack": "🍎",
};

const dailyIntakeData = [
    { day: "Sen", intake: 1500 },
    { day: "Sel", intake: 1800 },
    { day: "Rab", intake: 1650 },
    { day: "Kam", intake: 1400 },
    { day: "Jum", intake: 2000 },
    { day: "Sab", intake: 1900 },
    { day: "Min", intake: 1750 },
];

const barChartConfig = {
    intake: {
        label: "Kalori",
        color: "#FF90A7",
    },
};

const lineChartConfig = {
    calories: {
        label: "Kalori",
        color: "#FF90A7",
    },
};

const ProductCard = ({ category, name, protein }) => (
    <Card className="p-3 shadow-sm h-full flex flex-col justify-between relative border-2 border-gray-100" style={{ minHeight: '120px' }}>
        {category === "Food" &&
            <span className="absolute -top-6 -left-3 text-4xl lg:text-5xl">🍛</span>
        }
        {category === "Drink" &&
            <span className="absolute -top-3 -left-5 text-4xl lg:text-5xl">🥤</span>
        }
        {category === "Snack" &&
            <span className="absolute -top-4 -left-5 text-4xl lg:text-5xl">🍎</span>
        }
        {category === "Supplement" &&
            <span className="absolute -top-4 -left-5 text-4xl lg:text-5xl">💊</span>
        }
        <div className="text-right text-xs text-gray-500 font-medium">{category}</div>
        <div>
            <p className="text-xs text-gray-500 font-bold">{protein}</p>
            <p className="text-sm font-semibold">{name}</p>
        </div>
    </Card>
);

const MealItem = ({ time, calories, icon }) => (
    <div className="text-center">
        <span className="text-2xl">{icon}</span>
        <p className="text-lg font-bold text-gray-800">{calories}</p>
        <p className="text-base font-semibold text-primary">{time}</p>
        <p className="text-xs text-gray-500">Calories</p>
    </div>
);

const FeaturedRecentMeal = ({ data }) => (
    <div className="mt-4 h-full flex flex-col pb-28 lg:pb-20">
        <h1 className="text-lg font-bold text-gray-800 mb-4">{data?.name}</h1>
        <div className="grid grid-cols-2 gap-4 flex-grow">
            <div className="text-center p-2 rounded-md border flex flex-col items-center justify-center border-gray-200">
                <p className="lg:text-2xl text-xl text-gray-500">Calories Consumed</p>
                <p className="lg:text-xl text-lg font-bold text-gray-800">{data?.calories}</p>
            </div>
            <div className="text-center p-2 rounded-md border flex flex-col items-center justify-center border-gray-200">
                <p className="lg:text-2xl text-xl text-gray-500">Proteins</p>
                <p className="lg:text-xl text-lg font-bold text-gray-800">{data?.protein}</p>
            </div>
            <div className="text-center p-2 rounded-md border flex flex-col items-center justify-center border-gray-200">
                <p className="lg:text-2xl text-xl text-gray-500">Carbohydrates</p>
                <p className="lg:text-xl text-lg font-bold text-gray-800">{data?.carbs}</p>
            </div>
            <div className="text-center p-2 rounded-md border flex flex-col items-center justify-center border-gray-200">
                <p className="lg:text-2xl text-xl text-gray-500">Fats</p>
                <p className="lg:text-xl text-lg font-bold text-gray-800">{data?.fat}</p>
            </div>
        </div>
    </div>
);

const renderStatCardContent = (label, totalValue, lastValue, isLoading) => (
    <>
        <p className="text-sm text-gray-500">{label}</p>
        {isLoading ? (
            <Skeleton className="w-1/2 h-8 mx-auto mt-1 mb-1" />
        ) : (
            <p className="text-3xl font-bold text-gray-800">{totalValue}</p>
        )}
        {isLoading ? (
            <Skeleton className="w-1/4 h-3 mx-auto" />
        ) : (
            <p className="text-xs text-green-500">{lastValue}</p>
        )}
    </>
);


export default function NutritionView() {
    const [isInitialLoading, setIsInitialLoading] = React.useState(true);
    const [isLoadingMore, setIsLoadingMore] = React.useState(false);
    const [foods, setFoods] = React.useState([]);
    const [hasMore, setHasMore] = React.useState(true);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const {
        data: dataDailyNutrition,
        isLoading: isDailyLoading,
        mutate: mutateDailyNutrition,
    } = useSWR('nutrition', API.Nutrition.getDailyNutrition);

    const {
        data: dataLastMeal,
        isLoading: isLastMealLoading,
        mutate: mutateLastMeal,
    } = useSWR('lastMeal', API.Nutrition.getLastMeal);

    const {
        data: dataWeeklyNutrition,
        isLoading: isWeeklyLoading,
        mutate: mutateWeeklyNutrition,
    } = useSWR('weeklyNutrition', API.Nutrition.getWeeklyNutrition);

    const limit = 10;

    const fetchFood = async (page) => {
        try {
            if (page === 1) {
                setIsInitialLoading(true);
            } else {
                setIsLoadingMore(true);
            }

            const data = await API.Nutrition.getAllFood({ page, limit });

            if (page === 1) {
                setFoods(data.foods);
            } else {
                setFoods(prev => [...prev, ...data.foods]);
            }

            setHasMore(page < data.totalPages);
        } catch (error) {
            toast.error(error.message || "Failed to fetch foods.");
        } finally {
            setIsInitialLoading(false);
            setIsLoadingMore(false);
        }
    };

    const handleReportDailyNutrition = async () => {
        try {
            const response = await API.Nutrition.getReportDailyNutrition();

            if (response && response.reportUrl) {
                const pdfUrl = response.reportUrl;

                window.open(pdfUrl, '_blank');

                toast.success("Detailed report opened in a new tab.");

            } else {
                toast.error("Failed to generate or retrieve the report link.");
            }
        } catch (error) {
            const errorMessage = error.message || "Failed to open report. Please try again.";
            toast.error(errorMessage);
        }
    }

    React.useEffect(() => {
        fetchFood(1);
    }, []);

    const formattedWeeklyData = React.useMemo(() => {
        if (!dataWeeklyNutrition?.formattedCalories) return [];

        return dataWeeklyNutrition.formattedCalories.map(item => {
            const numericCalories = parseFloat(item.totalCalories.replace(' kcal', ''));
            return {
                date: item.date,
                calories: numericCalories,
            };
        });
    }, [dataWeeklyNutrition]);

    return (
        <div className="p-4 lg:p-8 space-y-5 lg:space-y-8 min-h-screen bg-[#F8F8F8]">

            <h1 className="text-2xl font-bold text-gray-800">NUTRITION TRACKER</h1>

            <Card className="rounded-2xl shadow-lg border-none">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-xl font-bold text-gray-800">
                                Nutrition Overview
                            </CardTitle>
                            <p className="text-sm text-gray-500">See how your meals stack up today.</p>
                        </div>
                        <Button
                            size="sm"
                            className="text-white bg-primary hover:bg-primary/90 text-sm"
                            onClick={handleReportDailyNutrition}
                        >
                            View Detailed Report
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {isDailyLoading ? (
                        <NutritionStatsSkeleton />
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                            <div className="lg:col-span-2 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Card className="text-center p-4 rounded-md shadow-sm border-2 border-gray-100">
                                        {renderStatCardContent("Calories Consumed", dataDailyNutrition?.totalNutrition?.calories, dataDailyNutrition?.lastNutrition?.calories, isDailyLoading)}
                                    </Card>
                                    <Card className="text-center p-4 rounded-md shadow-sm border-2 border-gray-100">
                                        {renderStatCardContent("Proteins", dataDailyNutrition?.totalNutrition?.protein, dataDailyNutrition?.lastNutrition?.protein, isDailyLoading)}
                                    </Card>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Card className="text-center p-4 rounded-md shadow-sm border-2 border-gray-100">
                                        {renderStatCardContent("Carbohydrates", formatNutritionValue(dataDailyNutrition?.totalNutrition?.carbs), formatNutritionValue(dataDailyNutrition?.lastNutrition?.carbs), isDailyLoading)}
                                    </Card>
                                    <Card className="text-center p-4 rounded-md shadow-sm border-2 border-gray-100">
                                        {renderStatCardContent("Fats", formatNutritionValue(dataDailyNutrition?.totalNutrition?.fat), formatNutritionValue(dataDailyNutrition?.lastNutrition?.fat), isDailyLoading)}
                                    </Card>
                                </div>
                            </div>

                            <div className="lg:col-span-3 p-5 rounded-2xl bg-white border border-gray-100">
                                <h3 className="text-base font-semibold mb-4 text-gray-800">Caloric Intake</h3>
                                <ChartContainer config={barChartConfig} className="h-[200px] w-full">
                                    <BarChart accessibilityLayer data={dailyIntakeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                                        <ChartTooltip content={<ChartTooltipContent
                                            labelFormatter={(day) => `Hari ${day}`}
                                            nameFormatter={() => "Kalori"}
                                        />} />
                                        <Bar
                                            dataKey="intake"
                                            fill="#ff90a7"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ChartContainer>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="space-y-0 pt-4">
                <h2 className="text-xl font-bold text-gray-800">History Meals</h2>
                <p className="text-sm text-gray-500">
                    Browse through various food, drinks, snacks, and supplements you have logged.
                </p>

                {isInitialLoading ? (
                    <ProductListSkeleton count={5} />
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-10">
                        {foods.map((product, index) => (
                            <ProductCard key={index} category={product.category} name={product.name} protein={product.calories} />
                        ))}
                    </div>
                )}
            </div>

            {isLastMealLoading && isWeeklyLoading ? (
                <RecentMealAndChartSkeleton />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 items-stretch">
                    <div className="pb-10">
                        <h2 className="text-xl font-bold text-gray-800">Recent Meals</h2>
                        <p className="text-sm text-gray-500 mb-4">View the meals you have consumed this week</p>

                        <AddMealDialog
                            isDialogOpen={isDialogOpen}
                            setIsDialogOpen={setIsDialogOpen}
                            mutateDailyNutrition={mutateDailyNutrition}
                            fetchFood={fetchFood}
                            mutateLastMeal={mutateLastMeal}
                            mutateWeeklyNutrition={mutateWeeklyNutrition}
                        />

                        <FeaturedRecentMeal data={dataLastMeal?.lastFood} />

                    </div>

                    <div className="h-full space-y-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Caloric Intake Over the Week</h2>

                        <Card className="shadow-none border-2 border-gray-100 p-6 rounded-2xl relative overflow-hidden">
                            <h3 className="text-base font-bold text-gray-800 mb-4">Caloric Intake per Meal</h3>
                            <div className="grid grid-cols-4 gap-4">
                                {dataWeeklyNutrition?.categoryCalories?.map((meal, index) => (
                                    <MealItem
                                        key={index}
                                        time={meal.category}
                                        calories={meal.totalCalories}
                                        icon={MEAL_ICONS[meal.category] || "🍽️"}
                                    />
                                ))}
                            </div>
                        </Card>
                        <Card className="p-4 rounded-2xl shadow-lg border-none">
                            <ChartContainer config={lineChartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={formattedWeeklyData}
                                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                >
                                    <ChartTooltip
                                        content={<ChartTooltipContent
                                            labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                                            nameFormatter={() => "Kalori"}
                                            valueFormatter={(value) => `${value} kcal`}
                                        />}
                                    />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                                    />
                                    <Area
                                        dataKey="calories"
                                        type="monotone"
                                        stroke="#FF90A7"
                                        strokeWidth={3}
                                        fill="url(#colorCalories)"
                                    />

                                    <defs>
                                        <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#FF90A7" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#FF90A7" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                </AreaChart>
                            </ChartContainer>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}