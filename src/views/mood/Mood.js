"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PieChart, Pie, Label } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as API from "@/core/services/api";
import { useFormik } from 'formik'
import { toast } from 'sonner';
import useSWR, { mutate as globalMutate } from "swr";
import { MoodHistoryItemSkeleton, MoodSkeleton } from "@/components/shared/skeleton/MoodSkeleton";
import { MoodDetailDialog } from "./MoodDetailDialog";
import { cleanPercentage } from "@/config/global";
import { MoodHistoryItem } from "./MoodHistoryItem";

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

export default function MoodView() {
    const [selectedMood, setSelectedMood] = React.useState(null);
    const [selectedDuration, setSelectedDuration] = React.useState('Today');
    const [currentPage, setCurrentPage] = React.useState(1);
    const observerTarget = React.useRef(null);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [selectedMoodDetail, setSelectedMoodDetail] = React.useState(null);
    const [deleteDialog, setDeleteDialog] = React.useState({
        open: false,
        id: null
    });
    const [accumulatedMoods, setAccumulatedMoods] = React.useState([]);

    const limit = 10;

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
        data: moodListData,
        isLoading: isMoodListLoading,
        mutate: mutateMoodList
    } = useSWR(
        ['moodList', currentPage],
        () => API.Mood.getAllDailyMood({ page: currentPage, limit })
    );

    React.useEffect(() => {
        if (moodListData) {
            if (currentPage === 1) {
                setAccumulatedMoods(moodListData.moods);
            } else {
                setAccumulatedMoods(prev => {
                    const existingIds = new Set(prev.map(item => item._id));
                    const newMoods = moodListData.moods.filter(item => !existingIds.has(item._id));
                    return [...prev, ...newMoods];
                });
            }
        }
    }, [moodListData, currentPage]);

    const hasMore = moodListData ? currentPage < moodListData.totalPages : true;

    const { moodChartData, moodChartConfig, mainMood } = React.useMemo(() => {
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

                await toast.promise(saveMoodPromise, {
                    loading: "Saving your mood...",
                    success: (data) => {
                        return data.message || "Mood saved successfully!";
                    },
                    error: (err) => {
                        return `Failed to save mood! ${err.message || "Please try again."}`;
                    },
                });

                resetForm();
                setSelectedMood(null);

                await globalMutate(
                    key => Array.isArray(key) && key[0] === 'moodList',
                    undefined,
                    { revalidate: false }
                );

                setAccumulatedMoods([]);

                const freshData = await API.Mood.getAllDailyMood({ page: 1, limit });
                setAccumulatedMoods(freshData.moods);

                setCurrentPage(1);

                mutate();

            } catch (error) {
                console.error("Save mood failed:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleConfirmDelete = async () => {
        const { id } = deleteDialog || {};
        if (!id) return;

        try {
            const deleteMoodPromise = API.Mood.delete(id);

            toast.promise(deleteMoodPromise, {
                loading: 'Deleting mood...',
                success: 'Mood deleted successfully!',
                error: (error) => `Failed to delete mood! ${error.message}`,
            });

            await globalMutate(
                key => Array.isArray(key) && key[0] === 'moodList',
                undefined,
                { revalidate: false }
            );
            setAccumulatedMoods([]);
            const freshData = await API.Mood.getAllDailyMood({ page: 1, limit });
            setAccumulatedMoods(freshData.moods);
            setCurrentPage(1);
            mutate();
        } catch (error) {
            console.error("Delete mood failed:", error);
        } finally {
            setDeleteDialog({ open: false, id: null });
        }
    };

    const handleMoodItemClick = (moodItem) => {
        setSelectedMoodDetail(moodItem);
        setIsDialogOpen(true);
    };

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isMoodListLoading) {
                    setCurrentPage(prev => prev + 1);
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }
        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
            observer.disconnect();
        };
    }, [hasMore, isMoodListLoading]);

    React.useEffect(() => {
        if (selectedMood) {
            formik.setFieldValue('category', selectedMood);
        }
    }, [selectedMood]);

    if (isLoading && !dataDailyMood) {
        return <MoodSkeleton />;
    }

    return (
        <div className="p-4 sm:p-8 space-y-8 min-h-screen bg-[#F8F8F8]">
            <header className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-secondary">DAILY MOODS FEELING</h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-6 w-full col-span-2 lg:col-span-1">
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
                <Card className="shadow-none col-span-2">
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
                                className="w-full bg-primary hover:bg-primary/90 rounded-full text-white py-6 text-base font-semibold"
                            >
                                {formik.isSubmitting ? 'Saving...' : 'Save Today\'s Entry'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <ScrollArea className="h-[600px] w-full">
                {isMoodListLoading && currentPage === 1 ? (
                    <div className="space-y-4">
                        {[...Array(6)].map((_, i) => <MoodHistoryItemSkeleton key={i} />)}
                    </div>
                ) : accumulatedMoods.length > 0 ? (
                    <div className="space-y-4">
                        {accumulatedMoods.map((item) => (
                            <MoodHistoryItem
                                key={item._id}
                                item={item}
                                onClick={handleMoodItemClick}
                                deleteDialog={deleteDialog}
                                setDeleteDialog={setDeleteDialog}
                                handleConfirmDelete={handleConfirmDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 col-span-full">
                        No moods available. Be the first to add one!
                    </p>
                )}

                {isMoodListLoading && currentPage > 1 && (
                    <p className="text-center text-primary/70 py-4">Loading more moods...</p>
                )}

                {hasMore && !isMoodListLoading && (
                    <div ref={observerTarget} className="h-1" />
                )}
            </ScrollArea>

            <MoodDetailDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                moodDetails={selectedMoodDetail}
            />
        </div>
    );
}