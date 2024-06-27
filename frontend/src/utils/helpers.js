export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

export const formatText = (input) => {
    return input
        .trim() // Remove spaces at the beginning and end
        .replace(/\s+/g, ' '); // Replace multiple spaces with a single space
};