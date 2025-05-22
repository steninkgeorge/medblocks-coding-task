import { create } from "zustand";
import { initDb } from "../db/initDb";

export const useDbState = create((set)=>({
    db: null, 
    isInitialized:false , 
    loading: true,
    error: null,
    initDb: async()=>{
        try {
          const db = await initDb();
          set({ db, isInitialized: true, loading: false });
        } catch (err) {
          set({ error: err, loading: false });
        }
    }
}))