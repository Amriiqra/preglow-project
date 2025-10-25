export const baseUrl = "https://preglow.vercel.app";

export const formatContent = (rawContent) => {
    if (!rawContent) return null;
    const blocks = rawContent.split(/\r?\n\r?\n/);

    return blocks.map((block, index) => {
        const trimmedBlock = block.trim();
        if (!trimmedBlock) return null;

        if (trimmedBlock.startsWith("Kapan tepatnya") ||
            trimmedBlock.startsWith("Apa satu tips") ||
            trimmedBlock.startsWith("Apakah ada yang menyesal")) {
            const listItems = trimmedBlock.split(/\r?\n/);

            return (
                <ul key={index} className="list-disc list-inside space-y-3 pl-4 pt-3 text-base">
                    {listItems.filter(item => item.trim() !== '').map((item, i) => (
                        <li key={i} className="text-gray-700">
                            <strong>{item.trim().split(':')[0]}?</strong>{item.trim().includes(':') ? item.trim().split(':')[1] : ''}
                        </li>
                    ))}
                </ul>
            );
        }
        const contentText = trimmedBlock.replace(/\r?\n/g, ' ');

        return (
            <p key={index} className="mb-4 leading-relaxed text-gray-700 text-justify">
                {contentText}
            </p>
        );
    }).filter(item => item !== null);
};

export const formatNumber = (number) => {
    if (number === null || number === undefined || isNaN(Number(number))) {
        return 0;
    }

    return new Intl.NumberFormat('id-ID').format(number);
};

export const formatNutritionValue = (value) => {
    if (!value || typeof value !== 'string' || value.trim() === "") return null;

    const parts = value.trim().split(" ");
    let numberStr = parts[0];

    const unit = parts.length > 1 ? ` ${parts[1]}` : " g";

    try {
        const number = parseFloat(numberStr);

        if (isNaN(number)) return value;

        if (number === 0) return `0.0${unit}`;

        return number.toFixed(1) + unit;
    } catch (e) {
        return value;
    }
};

export const cleanPercentage = (percentageString) => {
    if (!percentageString) return '';
    return percentageString.replace(/\.0%$/, '%');
};