// PROJECT IMPORTS
import NutritionView from "@/views/nutrition/Nutrion";

// ==============================|| Nutrition ||============================== //

export const metadata = {
    title: "Nutrition Tracker",
    description: "Nutrition Tracker",
    icons: {
        icon: '/assets/logosingle.svg',
    },
};

const Nutrition = () => {
    return <NutritionView />;
};

export default Nutrition;
