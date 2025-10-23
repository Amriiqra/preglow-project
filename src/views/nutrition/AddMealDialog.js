"use client"

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
import * as API from "@/core/services/api";
import { useFormik } from "formik";
import { FoodSchema, initialFoodValues } from "./ValidationSchema";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const AddMealDialog = ({ isDialogOpen, setIsDialogOpen, mutateDailyNutrition, fetchFood }) => {

    const formik = useFormik({
        initialValues: initialFoodValues,
        validationSchema: FoodSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                await API.Nutrition.createFood(values);

                toast.success(`${values.name} added successfully!`);

                resetForm();
                setIsDialogOpen(false);

                await mutateDailyNutrition();
                await fetchFood(1);

            } catch (error) {
                const errorMessage = error.message || "Failed to add meal.";
                toast.error(errorMessage);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-white bg-primary border-gray-400 hover:bg-primary/90 hover:text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add New Meal
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={formik.handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Meal</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to add a new meal to your nutrition.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                onValueChange={(value) => formik.setFieldValue('category', value)}
                                value={formik.values.category}
                                onBlur={() => formik.setFieldTouched('category', true)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Breakfast">Breakfast</SelectItem>
                                        <SelectItem value="Lunch">Lunch</SelectItem>
                                        <SelectItem value="Dinner">Dinner</SelectItem>
                                        <SelectItem value="Snack">Snack</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {formik.touched.category && formik.errors.category && (
                                <p className="text-xs text-red-500">{formik.errors.category}</p>
                            )}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="name">Food Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="e.g., Rice, Grilled Chicken"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-xs text-red-500">{formik.errors.name}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button" disabled={formik.isSubmitting}>Cancel</Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="bg-primary hover:bg-primary/90"
                            disabled={formik.isSubmitting || !formik.isValid}
                        >
                            {formik.isSubmitting ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}