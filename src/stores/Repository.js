import { types } from "mobx-state-tree";

const Repository = types.
    model({
        id: types.identifier(types.number),
        name: types.string,
        full_name: types.string,
        description: types.optional(types.string, ""),
        openedAt: types.optional(types.number, 0)
    });

export default Repository;