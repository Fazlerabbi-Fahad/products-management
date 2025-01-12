/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto';

//#region generate string
export const findLongestIncreasingSubstrings = (productName: string): string[] => {
    const substrings: string[] = [];
    let currentSubstring = "";

    for (let i = 0; i < productName.length; i++) {
        const char = productName[i].toLowerCase();
        if (currentSubstring === "" || char > currentSubstring[currentSubstring.length - 1]) {
            currentSubstring += char;
        } else {
            substrings.push(currentSubstring);
            currentSubstring = char;
        }
    }

    if (currentSubstring) substrings.push(currentSubstring);

    const maxLength = Math.max(...substrings.map(sub => sub.length));
    return substrings.filter(sub => sub.length === maxLength);
};
//#endregion

//#region generate code
export const generateProductCode = async (productName: string): Promise<string> => {
    const hashedValue = crypto.createHash("md5").update(productName).digest("hex").slice(0, 8);

    // Call `findLongestIncreasingSubstrings` synchronously
    const increasingSubstrings = findLongestIncreasingSubstrings(productName);

    const startIndexes = increasingSubstrings.map(sub => productName.toLowerCase().indexOf(sub));
    const endIndexes = startIndexes.map((start:any, index: any) => start + increasingSubstrings[index].length - 1);

    const concatenatedSubstrings = increasingSubstrings.join("");
    const start = Math.min(...startIndexes);
    const end = Math.max(...endIndexes);

    return `${hashedValue}-${start}${concatenatedSubstrings}${end}`;
};
//#endregion