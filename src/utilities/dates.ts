/*
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
 */

type DateFormatedFnParams = {
    date: Date;
    extraConfig?: {
        era?: 'narrow' | 'short' | 'long';
        weekday?: 'narrow' | 'short' | 'long';
        year?: 'numeric' | '2-digit';
        month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
        day?: 'numeric' | '2-digit';
        hour?: 'numeric' | '2-digit';
        minute?: 'numeric' | '2-digit';
        second?: 'numeric' | '2-digit';
        timeZoneName?: 'short' | 'long';
    };
    locale?: string;
};

export const getDateFormated = ({ date, extraConfig = {}, locale = 'ru' }: DateFormatedFnParams): string => {
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric', ...extraConfig });
};
