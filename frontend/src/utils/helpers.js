export const formatDate = (isoString) => {
    return isoString ? isoString.split('T')[0] : '';
};
