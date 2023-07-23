import * as Localization from "expo-localization";
import en from "./locales/en";
import { assert } from "../language/assertions/Assert";

// Right now we only support detecting localisation
// Some day if we want to dynamically change the language in-app, we'll have to adjust the architecture
const locales = { en }; // We only support English right now
const language = Localization.locale.split("-")[0];
const locale = locales[language] || locales.en;

/**
 * Retrieves a localised string using its key.
 * Keys and localised string files are loacted in the /locales directory.
 *
 * ```
 * let buttonText = strings("button.done")
 * let interpolatedString = strings("welcome", "Billy") // Replaces "{0}" with "Billy"
 * ```
 *
 * @param path The key to the string
 * @param interpolations Strings to insert to {0}, {1}, etc.
 * @returns The translated string
 */
export function strings(path: string, ...interpolations: string[]): string {
    const localisedString = locale[path];
    assert(localisedString != undefined, `Invalid string path provided: ${path}`);
    return (localisedString as string).replace(/{(\d+)}/g, function (match, number) {
        return typeof interpolations[number] != "undefined" ? interpolations[number] : match;
    });
}
