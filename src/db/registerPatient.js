
import { initDb } from "./initDb";
// Function to create patient record

export const createPatient = async (patientData) => {
  try {
    const db = await initDb();

    const result = await db.query(
      `INSERT INTO patients (
        first_name,
        last_name,
        date_of_birth,
        gender,
        phone,
        address,
        insurance_id,
        insurer_name,
        health_summary
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [
        patientData.first_name,
        patientData.last_name,
        patientData.date_of_birth,
        patientData.gender,
        patientData.phone || null,
        patientData.address || null,
        patientData.insurance_id || null,
        patientData.insurer_name || null,
        patientData.health_summary || null,
      ]
    );
    console.log(result.rows?.[0])
    return result.rows?.[0]
  } catch (error) {
    console.error("Error creating patient:", error);
    throw error;
  }
};
