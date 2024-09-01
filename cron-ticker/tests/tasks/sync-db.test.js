const { syncDb } = require("../../src/tasks/sync-db");

describe("Pruebas en SyncDB", () => {
  test("debe de ejecutar el proceso 2 veces", () => {
    syncDb();
    const times = syncDb();
    expect(times).toBe(2);
  });
});
