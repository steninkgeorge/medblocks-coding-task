import { PGliteWorker } from "@electric-sql/pglite/worker";

let db = null;


const dbSchemaInit = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      date_of_birth TEXT NOT NULL,
      gender TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      insurance_id TEXT,
      insurer_name TEXT,
      health_summary TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`CREATE TABLE IF NOT EXISTS query_logs (
  id SERIAL PRIMARY KEY ,
  query TEXT NOT NULL,
  status TEXT NOT NULL,
  result_message TEXT,
  result TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);


  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_patient_name ON patients (last_name, first_name);
  `);
};


export async function initDb() {
  if (!db) {
    try {
      const worker = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
      });

      db = new PGliteWorker(worker);
      await dbSchemaInit(db);
      return db
    } catch (error) {
      throw error;
    }
  }
  return db
};
