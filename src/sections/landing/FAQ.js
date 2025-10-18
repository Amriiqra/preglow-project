import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
    return (
        <section id="faq" className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center my-10">
                <h1 className="text-secondary font-semibold text-2xl lg:text-4xl">Frequently Asked Questions</h1>
                <p className="text-gray-500 font-medium text-center">These are the most commonly asked questions about Preglow</p>
            </div>
            <div className="lg:w-1/2 w-full px-8 lg:px-0 mx-auto">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-1"
                >
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-bold text-xl">Product Information</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p className="text-base text-gray-500">
                                Your pregnancy week is calculated based on the Estimated Due Date (EDD) you provide during registration. We use a standard 40-week model from the first day of your last menstrual period (LMP) to determine your current week, which helps us provide you with the most accurate developmental information.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-bold text-xl">Can I update my due date if my doctor changes it?</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p className="text-base text-gray-500">
                                Absolutely! You can update your Estimated Due Date (EDD) at any time in the app settings. Simply navigate to your profile, select "Edit Profile," and enter the new due date provided by your healthcare provider. This will ensure that all the information and features in the app remain accurate and tailored to your pregnancy journey.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-bold text-xl">Is the community forum truly anonymous?</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p className="text-base text-gray-500">
                                Yes, the community forum is designed to be a safe and anonymous space for all users. We do not require any personal information to participate, and all user interactions are kept confidential.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="font-bold text-xl">How does the AI Chatbot work?</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p className="text-base text-gray-500">
                                The AI Chatbot is designed to provide instant support and information to users. It utilizes natural language processing to understand user queries and deliver relevant responses. You can ask the chatbot questions about pregnancy, app features, and more, and it will do its best to assist you.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger className="font-bold text-xl">Can I update my due date if my doctor changes it?</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p className="text-base text-gray-500">
                                Absolutely! You can update your Estimated Due Date (EDD) at any time in the app settings. Simply navigate to your profile, select "Edit Profile," and enter the new due date provided by your healthcare provider. This will ensure that all the information and features in the app remain accurate and tailored to your pregnancy journey.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger className="font-bold text-xl">Can I update my due date if my doctor changes it?</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p className="text-base text-gray-500">
                                Absolutely! You can update your Estimated Due Date (EDD) at any time in the app settings. Simply navigate to your profile, select "Edit Profile," and enter the new due date provided by your healthcare provider. This will ensure that all the information and features in the app remain accurate and tailored to your pregnancy journey.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}
