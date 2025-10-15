// PROJECT IMPORTS
import MeditationView from "@/views/meditation/MeditationView";

// ==============================|| Meditation ||============================== //

export const metadata = {
    title: "Meditation Tracker",
    description: "Meditation Tracker",
};

const Meditation = () => {
    return (
        <div className="overflow-hidden">
            <MeditationView />
        </div>
    )
};

export default Meditation;
