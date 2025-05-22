import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import styles from '../styles/form.module.css'
import { createPatient } from "../db/registerPatient";

const patientSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  insurance_id: z.string().optional(),
  insurer_name: z.string().optional(),
  health_summary: z.string().optional(),
});


const PatientRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(
  {
    resolver: zodResolver(patientSchema),
  });

  const onSubmit = async (formData) => {
 try {

   // Create patient in database
   console.log(formData)
   const patientId = await createPatient(formData);
  console.log(patientId)
   
   reset(); // Reset form after successful submission
 } catch (error) {
  
   console.error("Registration error:", error);
 }
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-right" />
      <h2 className={styles.title}>Patient Registration</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="first_name">First Name*</label>
            <input
              type="text"
              id="first_name"
              {...register("first_name")}
              className={errors.first_name ? styles.error : ""}
            />
            {errors.first_name && (
              <span className={styles.errorMessage}>
                {errors.first_name.message}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="last_name">Last Name*</label>
            <input
              type="text"
              id="last_name"
              {...register("last_name")}
              className={errors.last_name ? styles.error : ""}
            />
            {errors.last_name && (
              <span className={styles.errorMessage}>
                {errors.last_name.message}
              </span>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="date_of_birth">Date of Birth*</label>
            <input
              type="date"
              id="date_of_birth"
              {...register("date_of_birth")}
              className={errors.date_of_birth ? styles.error : ""}
            />
            {errors.date_of_birth && (
              <span className={styles.errorMessage}>
                {errors.date_of_birth.message}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="gender">Gender*</label>
            <select
              id="gender"
              {...register("gender")}
              className={errors.gender ? styles.error : ""}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <span className={styles.errorMessage}>
                {errors.gender.message}
              </span>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" {...register("phone")} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" {...register("address")} />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="insurance_id">Insurance ID</label>
            <input
              type="text"
              id="insurance_id"
              {...register("insurance_id")}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="insurer_name">Insurer Name</label>
            <input
              type="text"
              id="insurer_name"
              {...register("insurer_name")}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="health_summary">Health Summary</label>
          <textarea
            id="health_summary"
            {...register("health_summary")}
            rows={4}
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            Register Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientRegistration;
