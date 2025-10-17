import Navbar from "@/components/shared/Navbar";

export const metadata = {
    title: "Detail Blog",
    description: "Detail Blog",
};

export default function Layout({ children }) {
    return <div>
        <Navbar />
        {children}
    </div>;
}
