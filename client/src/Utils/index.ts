export const classes = (...classes: (string | false | null)[]): string => {
    return classes.filter(Boolean).join(" ");
};

export const isValidEmail = (email: string) => {
    return /^[^\s@]+@([a-zA-Z]+\.)+[a-zA-Z]{2,}$/.test(email);
};

export const isValidDate = (year: number, month: number, day: number) => {
    month = month - 1;
    const date = new Date(year, month, day);
    if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) return false;
    return true;
};

export const isValidUsername = (username: string) => {
    return /^[A-Za-z0-9_.]+$/.test(username);
};

export const getDays = () => {
    return Array.from({ length: 31 }, (_, index) => {
        return { id: index, label: index + 1 };
    });
};

export const getMonths = () => {
    return Array.from({ length: 12 }, (_, index) => {
        return { id: index, label: index + 1 };
    });
};

export const getYears = (baseYear: number, range: number, offset: number) => {
    return Array.from({ length: range }, (_, index) => {
        return { id: index, label: (baseYear - offset) - index };
    });
};