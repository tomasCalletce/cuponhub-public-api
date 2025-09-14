export enum Keywords {
  NAME = "{name}"
}

interface ReplaceKeywordsParams {
  text: string;
  patterns: Keywords[];
  keywords: string[];
}

export const replaceKeywords = ({ text, patterns, keywords }: ReplaceKeywordsParams): string => {
  let result = text;
  
  patterns.forEach((pattern, index) => {
    if (keywords[index]) {
      result = result.replace(new RegExp(pattern, 'g'), keywords[index]);
    }
  });
  
  return result;
};