/*
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
 */

type DateFormatedFnParams = {
	date: Date;
	extraConfig?: Intl.DateTimeFormatOptions;
	locale?: string;
};

export const getDateFormated = ({
	date,
	extraConfig = {},
	locale = 'ru',
}: DateFormatedFnParams): string => {
	return date.toLocaleDateString(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		...extraConfig,
	});
};
