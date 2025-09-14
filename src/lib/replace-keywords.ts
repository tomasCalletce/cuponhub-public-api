export enum Keywords {
  NAME = "{name}",
  MONTH = "{month}",
  YEAR = "{year}",
  OFFER_VALUE = "{offer-value}",
  COUPON_COUNT = "{coupon-count}",
  OFFER_COUNT = "{offer-count}",
}

export const replaceKeywords = ({
  text,
  patterns,
  keywords,
}: {
  text: string;
  patterns: Keywords[];
  keywords: string[];
}): string => {
  if (patterns.length !== keywords.length) {
    throw new Error("Patterns and keywords must have the same length");
  }

  return patterns.reduce((acc, pattern, index) => {
    const regex = new RegExp(pattern, "g");
    return acc.replace(regex, keywords[index]!);
  }, text);
};
