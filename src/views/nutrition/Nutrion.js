"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BarChart, Bar, AreaChart, Area, XAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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

const weeklyCaloricData = [
    { month: 1, calories: 1800 },
    { month: 2, calories: 1950 },
    { month: 3, calories: 1600 },
    { month: 4, calories: 1700 },
    { month: 5, calories: 2000 },
    { month: 6, calories: 1900 },
    { month: 7, calories: 1850 },
    { month: 8, calories: 1900 },
    { month: 9, calories: 2050 },
];

const lineChartConfig = {
    calories: {
        label: "Kalori",
        color: "#FF90A7",
    },
};

const productData = [
    { category: "Food", name: "Grilled Chicken Breast", protein: "25g" },
    { category: "Drink", name: "Soy Milk", protein: "8g" },
    { category: "Snack", name: "Greek Yogurt", protein: "10g" },
    { category: "Supplement", name: "Whey Protein", protein: "20g" },
    { category: "Supplement", name: "Essential Fatty Acids", protein: "0g" },
];

const mealData = [
    { time: "Breakfast", calories: 350, icon: "🥚" },
    { time: "Lunch", calories: 450, icon: "🥗" },
    { time: "Dinner", calories: 600, icon: "🍜" },
    { time: "Snack", calories: 100, icon: "🍎" },
];

const nasiGorengData = {
    name: "Nasi Goreng",
    calories: "1,500",
    proteins: "50g",
    carbohydrates: "290g",
    fats: "30g",
    caloriesDiff: "+200",
    proteinsDiff: "+10g",
    carbohydratesDiff: "-5g",
    fatsDiff: "+5g"
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
    <div className="lg:p-4  mt-4 h-full flex flex-col">
        <h1 className="text-lg font-bold text-gray-800 mb-4">{data.name}</h1>
        <div className="grid grid-cols-2 gap-4 flex-grow">
            <div className="text-center p-2 rounded-md border flex flex-col items-center justify-center border-gray-200">
                <p className="lg:text-2xl text-xl text-gray-500">Calories Consumed</p>
                <p className="lg:text-xl text-lg font-bold text-gray-800">{data.calories}</p>
                <p className="text-xs text-green-500">{data.caloriesDiff}</p>
            </div>
            <div className="text-center p-2 rounded-md border flex flex-col items-center justify-center border-gray-200">
                <p className="lg:text-2xl text-xl text-gray-500">Proteins</p>
                <p className="lg:text-xl text-lg font-bold text-gray-800">{data.proteins}</p>
                <p className="text-xs text-green-500">{data.proteinsDiff}</p>
            </div>
            <div className="text-center p-2 rounded-md border flex flex-col items-center justify-center border-gray-200">
                <p className="lg:text-2xl text-xl text-gray-500">Carbohydrates</p>
                <p className="lg:text-xl text-lg font-bold text-gray-800">{data.carbohydrates}</p>
                <p className="text-xs text-red-500">{data.carbohydratesDiff}</p>
            </div>
            <div className="text-center p-2 rounded-md border flex flex-col items-center justify-center border-gray-200">
                <p className="lg:text-2xl text-xl text-gray-500">Fats</p>
                <p className="lg:text-xl text-lg font-bold text-gray-800">{data.fats}</p>
                <p className="text-xs text-green-500">{data.fatsDiff}</p>
            </div>
        </div>
    </div>
);


export default function NutritionView() {
    return (
        <div className="p-4 lg:p-8 space-y-5 lg:space-y-8 min-h-screen bg-[#F8F8F8]">

            <h1 className="text-2xl font-bold text-gray-800">DAILY NUTRITION TRACKER</h1>

            <Card className="rounded-2xl shadow-lg border-none">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-xl font-bold text-gray-800">
                                Today's Nutrition Overview
                            </CardTitle>
                            <p className="text-sm text-gray-500">See how your meals stack up today.</p>
                        </div>
                        <Button size="sm" className="text-white bg-primary hover:bg-primary/90 text-sm">
                            View Detailed Report
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="text-center p-4 rounded-md shadow-sm border-2 border-gray-100">
                                    <p className="text-sm text-gray-500">Calories Consumed</p>
                                    <p className="text-3xl font-bold text-gray-800">1,500</p>
                                    <p className="text-xs text-green-500">+200</p>
                                </Card>
                                <Card className="text-center p-4 rounded-md shadow-sm border-2 border-gray-100">
                                    <p className="text-sm text-gray-500">Proteins</p>
                                    <p className="text-3xl font-bold text-gray-800">50g</p>
                                    <p className="text-xs text-green-500">+10g</p>
                                </Card>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="text-center p-4 rounded-md shadow-sm border-2 border-gray-100">
                                    <p className="text-sm text-gray-500">Carbohydrates</p>
                                    <p className="text-3xl font-bold text-gray-800">290g</p>
                                    <p className="text-xs text-red-500">-5g</p>
                                </Card>
                                <Card className="text-center p-4 rounded-md shadow-sm border-2 border-gray-100">
                                    <p className="text-sm text-gray-500">Fats</p>
                                    <p className="text-3xl font-bold text-gray-800">30g</p>
                                    <p className="text-xs text-green-500">+5g</p>
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
                </CardContent>
            </Card>

            <div className="space-y-4 pt-4">
                <h2 className="text-xl font-bold text-gray-800">History Meals</h2>
                <p className="text-sm text-gray-500">
                    Browse through various food, drinks, snacks, and supplements you have logged.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {productData.map((product, index) => (
                        <ProductCard key={index} category={product.category} name={product.name} protein={product.protein} />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 **items-stretch**">
                <div className="p-4 **h-full** mb-30">
                    <h2 className="text-xl font-bold text-gray-800">Recent Meals</h2>
                    <p className="text-sm text-gray-500 mb-4">View the meals you have consumed this week</p>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="text-white bg-primary border-gray-400 hover:bg-primary/90 hover:text-white">
                                <Plus className="w-4 h-4 mr-2" /> Add New Meal
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New Meal</DialogTitle>
                                <DialogDescription>
                                    Fill in the details below to add a new meal to your nutrition.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="category">Category</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="breakfast">Breakfast</SelectItem>
                                                <SelectItem value="lunch">Lunch</SelectItem>
                                                <SelectItem value="dinner">Dinner</SelectItem>
                                                <SelectItem value="snack">Snack</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="food-item">Food Name</Label>
                                    <Input id="food-item" name="food-item" placeholder="Food Name" />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" className="bg-primary hover:bg-primary/90">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <FeaturedRecentMeal data={nasiGorengData} />

                </div>

                <div className="h-full space-y-4 mb-20">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Caloric Intake Over the Week</h2>

                    <Card className="shadow-none border-2 border-gray-100 p-6 rounded-2xl relative overflow-hidden">
                        <h3 className="text-base font-bold text-gray-800 mb-4">Caloric Intake per Meal</h3>
                        <div className="grid grid-cols-4 gap-4">
                            {mealData.map((meal, index) => (
                                <MealItem key={index} time={meal.time} calories={meal.calories} icon={meal.icon} />
                            ))}
                        </div>
                    </Card>
                    <Card className="p-4 rounded-2xl shadow-lg border-none h-full">
                        <ChartContainer config={lineChartConfig} className="h-full w-full">
                            <AreaChart accessibilityLayer data={weeklyCaloricData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <ChartTooltip content={<ChartTooltipContent />} />
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
        </div>
    );
}