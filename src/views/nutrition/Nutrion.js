"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BarChart, Bar, AreaChart, Area } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
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
    SelectLabel,
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

const ProductCard = ({ category, name, protein }) => (
    <Card className="p-3 shadow-sm h-full flex flex-col justify-between relative" style={{ minHeight: '120px' }}>
        {category === "Food" &&
            <span className="absolute -top-6 -left-3 text-5xl">🍛</span>
        }
        {category === "Drink" &&
            <span className="absolute -top-3 -left-5 text-5xl">🥤</span>
        }
        {category === "Snack" &&
            <span className="absolute -top-4 -left-5 text-5xl">🍎</span>
        }
        {category === "Supplement" &&
            <span className="absolute -top-4 -left-5 text-5xl">💊</span>
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
        <p className="text-base font-semibold text-secondary">{time}</p>
        <p className="text-xs text-gray-500">Calories</p>
    </div>
);


export default function NutritionView() {
    return (
        <div className="p-8 space-y-8 min-h-screen bg-[#F8F8F8]">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-secondary">DAILY NUTRITION TRACKER</h1>
            </header>

            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-secondary flex items-center justify-between">
                        Today's Nutrition Overview
                        <Button size="sm" className="w-1/5 text-white bg-primary hover:bg-primary/90 p-5">
                            View Detailed Report
                        </Button>
                    </CardTitle>
                    <p className="text-sm text-secondary">See how your meals stack up today.</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="text-center gap-0 rounded-md shadow-none text-secondary">
                                    <p>Calories Consumed</p>
                                    <p className="text-2xl font-medium">1,500</p>
                                    <p className="text-sm">+200</p>
                                </Card>
                                <Card className="text-center gap-0 rounded-md shadow-none text-secondary">
                                    <p>Proteins</p>
                                    <p className="text-2xl font-medium">50g</p>
                                    <p className="text-sm">+10g</p>
                                </Card>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="text-center gap-0 rounded-md shadow-none text-secondary">
                                    <p>Carbohydrates</p>
                                    <p className="text-2xl font-medium">290g</p>
                                    <p className="text-sm">-5g</p>
                                </Card>
                                <Card className="text-center gap-0 rounded-md shadow-none text-secondary">
                                    <p>Fats</p>
                                    <p className="text-2xl font-medium">30g</p>
                                    <p className="text-sm">+5g</p>
                                </Card>
                            </div>
                        </div>

                        <div className="lg:col-span-2 border p-5">
                            <h3 className="text-sm font-semibold mb-2">Calorie Intake</h3>
                            <Separator className="my-4" />
                            <ChartContainer config={barChartConfig} className="h-[240px] w-full">
                                <BarChart accessibilityLayer data={dailyIntakeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
                <h2 className="text-xl font-bold text-gray-800">Recommended Meals</h2>
                <p className="text-sm text-gray-500">Specially curated according to your unique pregnancy needs.</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {productData.map((product, index) => (
                        <ProductCard key={index} category={product.category} name={product.name} protein={product.protein} />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Meals</h2>
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
                                    <Label htmlFor="username-1">Category</Label>
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
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <p className="text-sm text-gray-500 mt-2">View the meals you have consumed this week</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border p-10 mt-2 rounded-2xl bg-white">
                        {mealData.map((meal, index) => (
                            <MealItem key={index} time={meal.time} calories={meal.calories} icon={meal.icon} />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Caloric Intake Over the Week</h2>
                    <ChartContainer config={lineChartConfig} className="h-[250px] w-full">
                        <AreaChart accessibilityLayer data={weeklyCaloricData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area
                                dataKey="calories"
                                type="monotone"
                                stroke="var(--color-calories)"
                                strokeWidth={3}
                                fill="url(#colorCalories)"
                            />

                            <defs>
                                <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-calories)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--color-calories)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                        </AreaChart>
                    </ChartContainer>
                </div>
            </div>
        </div>
    );
}