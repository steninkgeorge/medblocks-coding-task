import { create } from "zustand";
import { initDb } from "../db/initDb";
import { getPatientCount } from "../db/fetchPatientData";

export const useDbState = create((set)=>({
    db: null, 
    isInitialized:false , 
    loading: true,
    error: null,
    patientCount: 0,
    setPatientCount : (value)=>set({
      patientCount: value
    }),
    initDb: async()=>{
        try {
          const db = await initDb();
          const count = await getPatientCount()
          set({ db, isInitialized: true, loading: false, patientCount: count });
        } catch (err) {
          set({ error: err, loading: false });
        }
    }
}))