import { LANGUAGE_TO_FLAG } from "../constants";

// capitalize
export const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

// get language flag
export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 inline-block"
      />
    );
  }
  return null;
}

