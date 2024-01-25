export const classes = (...classes: (string | false | null)[]): string => {
    return classes.filter(Boolean).join(" ");
};