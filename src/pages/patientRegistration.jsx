import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { phoneRegex } from "../store/constants";

import { 
  Input, 
  Select, 
  Button, 
  Row, 
  Col, 
  Typography, 
  Card,
} from 'antd';
import { createPatient } from "../db/registerPatient";
import toast from "react-hot-toast";



const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const patientSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  date_of_birth: z
    .string()
    .min(1, "Date of birth is required")
    .refine(
      (val) => {
        const date = new Date(val);
        const now = new Date();
        return date <= now;
      },
      {
        message: "Enter a valid date",
      }
    ),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().regex(phoneRegex, "Enter a valid phone number").max(10, "Phone number too long").optional(),
  address: z.string().optional(),
  insurance_id: z.string().optional(),
  insurer_name: z.string().optional(),
  health_summary: z.string().optional(),
});


  const FormItem = ({ label, required, error, children }) => (
    <div style={{ marginBottom: "16px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "4px",
          fontWeight: 500,
          color: required ? "#000" : "#666",
        }}
      >
        {label} {required && <span style={{ color: "#ff4d4f" }}>*</span>}
      </label>
      {children}
      {error && (
        <div style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}>
          {error}
        </div>
      )}
    </div>
  );

const PatientRegistration = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(patientSchema),
  });

  const onSubmit = async (formData) => {
    try {
      // Create patient in database
      await createPatient(formData).then(() =>
        toast.success("registered successfully")
      );
      reset(); // Reset form after successful submission
    } catch (error) {
    }
  };


  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Patient Registration
        </Title>

        <form>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <FormItem 
                label="First Name" 
                required
                error={errors.first_name?.message}
              >
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      {...field} 
                      placeholder="Enter first name"
                      status={errors.first_name ? 'error' : ''}
                    />
                  )}
                />
              </FormItem>
            </Col>

            <Col xs={24} sm={12}>
              <FormItem 
                label="Last Name" 
                required
                error={errors.last_name?.message}
              >
                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      {...field} 
                      placeholder="Enter last name"
                      status={errors.last_name ? 'error' : ''}
                    />
                  )}
                />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <FormItem 
                label="Date of Birth" 
                required
                error={errors.date_of_birth?.message}
              >
                <Controller
                  name="date_of_birth"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      {...field} 
                      type="date"
                      status={errors.date_of_birth ? 'error' : ''}
                    />
                  )}
                />
              </FormItem>
            </Col>

            <Col xs={24} sm={12}>
              <FormItem 
                label="Gender" 
                required
                error={errors.gender?.message}
              >
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select 
                      {...field} 
                      placeholder="Select gender"
                      status={errors.gender ? 'error' : ''}
                      style={{ width: '100%' }}
                    >
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  )}
                />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <FormItem label="Phone Number">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter phone number" />
                  )}
                />
              </FormItem>
            </Col>

            <Col xs={24} sm={12}>
              <FormItem label="Address">
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter address" />
                  )}
                />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <FormItem label="Insurance ID">
                <Controller
                  name="insurance_id"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter insurance ID" />
                  )}
                />
              </FormItem>
            </Col>

            <Col xs={24} sm={12}>
              <FormItem label="Insurer Name">
                <Controller
                  name="insurer_name"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter insurer name" />
                  )}
                />
              </FormItem>
            </Col>
          </Row>

          <FormItem label="Health Summary">
            <Controller
              name="health_summary"
              control={control}
              render={({ field }) => (
                <TextArea 
                style={{minHeight:'150px', maxHeight:'300px',overflowY:'scroll'}}
                  {...field} 
                  rows={4} 
                  placeholder="Enter health summary (optional)"
                />
              )}
            />
          </FormItem>

          <div style={{ textAlign: 'right', marginTop: '2rem' }}>
            <Button 
              type="primary" 
              size="large"
              onClick={handleSubmit(onSubmit)}
            >
              Register Patient
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PatientRegistration;