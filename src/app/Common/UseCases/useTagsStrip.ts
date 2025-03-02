export const useTagsStrip = () => {
    const stripHtmlTags = (content: string) => {
        if (!content) return "";
        return content.replace(/<\/?[^>]+(>|$)/g, "");
    };

    return { stripHtmlTags };
};
