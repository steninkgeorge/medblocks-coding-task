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
export const searchPatientsByName = async (searchTerm) => {
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

export const getQueryLogs=async()=>{
  const database=await initDb();

  try{
    const res= await database.query('SELECT * FROM query_logs order by timestamp desc')
    console.log(res)
    return res.rows
  }catch(err){
    console.error("Error executing searchPatientsByName query:", err);
    throw err;
  }
}

//execute sql queries and fetch results
export const executeQuery = async (sqlQuery, params) => {
  const timestamp = new Date().toISOString();
  let resultMessage = "";
  let status = "success";
  let logs = [];

  const database = await initDb();
  try {
    const result = await database.query(sqlQuery, params);
    console.log(result);
    logs = result.rows || [];

    if (/^\s*select/i.test(sqlQuery)) {
      resultMessage = `Returned ${logs.length} rows`;
    } else {
      const updateResult = result.affectedRows;
      resultMessage = `Updated ${updateResult} rows`;
    }

    // Store log with result
    await database.query(
      `INSERT INTO query_logs (query, status, result_message, timestamp)
       VALUES ($1, $2, $3, $4)`,
      [sqlQuery, status, resultMessage, timestamp]
    );

    return {
      success: true,
      data: result.rows || [],
      error: null,
      affectedRows: result.affectedRows,
    };
  } catch (error) {
    status='error'
     await database.query(
       `INSERT INTO query_logs (query, status, result_message, timestamp)
       VALUES ($1, $2, $3, $4)`,
       [sqlQuery, status, resultMessage, timestamp]
     );


    console.error("Query execution error:", error);
    return {
      success: false,
      data: [],
      error: error.message || "An error occurred while executing the query",
      affectedRows: 0,
    };
  }
};
