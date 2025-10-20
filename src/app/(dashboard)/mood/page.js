// PROJECT IMPORTS
import MoodView from "@/views/mood/Mood";

// ==============================|| MOOD ||============================== //

export const metadata = {
    title: "Mood",
    description: "Mood",
    icons: {
        icon: '/assets/logosingle.svg',
    },
};

const Mood = () => {
    return <MoodView />;
};

export default Mood;
