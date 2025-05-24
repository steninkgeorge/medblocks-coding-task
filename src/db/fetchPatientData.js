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
    throw error;
  }
};

//get patient count
export const getPatientCount = async()=>{
  const database = await initDb()

  try{
    const result = await database.query('SELECT COUNT(*) as count FROM patients')
        return result.rows[0].count;

  }catch(error){
    throw error;

  }
}

// fetch all logged queries
export const getQueryLogs=async()=>{
  const database=await initDb();

  try{
    const res= await database.query('SELECT * FROM query_logs order by timestamp desc')
    return res.rows
  }catch(err){
    throw err;
  }
}

//execute sql queries and fetch results
export const executeQuery = async (sqlQuery, params) => {
  const timestamp = new Date().toISOString();
  let resultMessage = "";
  let status = "success";
  let logs = [];
  let result = []
  const database = await initDb();
  try {
    const lowerCaseQuery = sqlQuery.toLowerCase().trim();
if (
  !lowerCaseQuery.includes("drop table") &&
  !lowerCaseQuery.includes("query_logs")
) {
       result = await database.query(sqlQuery, params);

}
    
    logs = result?.rows || [];
    if (/^\s*select/i.test(sqlQuery)) {
      resultMessage = `Returned ${logs.length} rows`;
    } else {
      const updateResult = result.affectedRows;
      resultMessage = `Updated ${updateResult} rows`;
    }

    // Store log with result
    await database.query(
      `INSERT INTO query_logs (query, status, result_message,result, timestamp)
       VALUES ($1, $2, $3, $4, $5)`,
      [sqlQuery, status, resultMessage,JSON.stringify(logs), timestamp]
    );


    return {
      success: true,
      data: result.rows || [],
      error: null,
      affectedRows: result.affectedRows,
    };
  } catch (error) {
    status='error'
    resultMessage=`${error}`
     await database.query(
       `INSERT INTO query_logs (query, status, result_message,result, timestamp)
       VALUES ($1, $2, $3, $4,$5)`,
       [sqlQuery, status, resultMessage,null,timestamp]
     );


    return {
      success: false,
      data: [],
      error: error.message || "An error occurred while executing the query",
      affectedRows: 0,
    };
  }
};
