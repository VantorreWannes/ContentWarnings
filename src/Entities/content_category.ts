import { FlagPhrase } from "./flag_phrase";

export interface ContentCategory {
    name: string;
    description: string;
    flag_phrases: FlagPhrase[];
}
