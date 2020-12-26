export const storageGet = <T extends string>(itemName: string, defaultValue: T): T => {
    if (!localStorage) {
        return defaultValue;
    }
    const ItemValue: string = localStorage.getItem(itemName) ?? defaultValue;
    return ItemValue as T;
};

export const storageSet = (itemName: string, value?: string) => {
    if (value) {
        localStorage.setItem(itemName, value);
    } else {
        localStorage.removeItem(itemName);
    }
};
