import { initDb } from "./initDb";

//fetch all patient records
export const getAllPatients = async () => {
  const database = await initDb();
  try {

    const result = await database.query(
      "SELECT * FROM patients ORDER BY last_name, first_name"
    );
    return result.rows || [];
  } catch (error) {
    console.error("Error executing getAllPatients query:", error);
    throw error;
  }
};

//search a patient record based on their name 
export const searchPatientsByName = async (
  searchTerm
)=> {
  const database = await initDb();
  try {
    const result = await database.query(
      `SELECT * FROM patients
       WHERE first_name ILIKE $1 OR last_name ILIKE $2
       ORDER BY last_name, first_name`,
      [`%${searchTerm}%`, `%${searchTerm}%`]
    );
    return result.rows || [];
  } catch (error) {
    console.error("Error executing searchPatientsByName query:", error);
    throw error;
  }
};

//execute sql queries and fetch results
export const executeQuery = async (
  sqlQuery,
  params
)=> {
  try {
    const database = await initDb();
    const result = await database.query(sqlQuery, params);
    return { success: true, data: result.rows || [], error: null };
  } catch (error) {
    console.error("Query execution error:", error);
    return {
      success: false,
      data: [],
      error: error.message || "An error occurred while executing the query",
    };
  }
};