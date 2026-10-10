import Dexie, { type Table } from "dexie";
import type { Entry, Goal, Month } from "./schema";

class RitmoDB extends Dexie {
    entries!: Table<Entry, string>;
    goals!: Table<Goal, string>;
    months!: Table<Month, string>;

    constructor(name = "ritmo") {
        super(name);

        this.version(1).stores({
            entries: "date",
            goals: "id, monthKey",
            months: "key",
        });
    }
}

export const db = new RitmoDB();
