export const formatDate = (iso?: string | null): string => {
    if (!iso) return '';

    try {
        const dt = new Date(iso);
        if (isNaN(dt.getTime())) return '';

        const day = dt.getDate().toString().padStart(2, '0');
        const month = (dt.getMonth() + 1).toString().padStart(2, '0');
        const year = dt.getFullYear();

        return `Creado el ${day}/${month}/${year}`;
    } catch (e) {
        return '';
    }
};
