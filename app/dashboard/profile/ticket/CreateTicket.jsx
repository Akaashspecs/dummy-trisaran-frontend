"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { apiPost } from "../../../lib/api";
import { loadEncrypted } from "../../../utils";

const categories = [
  { label: "General", value: "general" },
  { label: "KYC Issue", value: "kyc_issue" },
  { label: "Payment Issue", value: "payment" },
  { label: "Product Inquiry", value: "product" },
  { label: "Commission", value: "commission" },
  { label: "Technical Issue", value: "technical" },
  { label: "Account", value: "account" },
  { label: "Other", value: "other" },
];

const TicketSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  subject: Yup.string()
    .min(3, "Subject must be at least 3 characters")
    .required("Subject is required"),
  message: Yup.string()
    .min(5, "Message must be at least 5 characters")
    .required("Message is required"),
});

export default function TicketForm({ setTicket }) {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg ">
      <h2 className="text-xl font-semibold mb-4">Create Support Ticket</h2>

      <Formik
        initialValues={{
          category: "",
          subject: "",
          message: "",
        }}
        validationSchema={TicketSchema}
        onSubmit={async (values, { resetForm }) => {
          const userId = localStorage.getItem("uid");
          const user = loadEncrypted("user");
          const supportTicketData = {
            category: values.category,
            message: values.message,
            subject: values.subject,
            priority: "normal",
            userId: userId,
            userName: user.fullName,
            userEmail: user.email,
            userPhone: user.phone,
          };
          console.log("Ticket Created:", supportTicketData);

          try {
            const response = await apiPost(
              "/api/tickets/create",
              supportTicketData
            );
            setTicket((prev) => [...prev, response.data]);

            toast.success("Ticket created successfully!");
          } catch (error) {
            toast.error(error.message);
          }
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* CATEGORY */}
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <Field
                as="select"
                name="category"
                className="w-full p-2 border rounded"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.value} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* SUBJECT */}
            <div>
              <label className="block mb-1 font-medium">Subject</label>
              <Field
                type="text"
                name="subject"
                placeholder="Enter subject"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="subject"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <Field
                as="textarea"
                name="message"
                rows="5"
                placeholder="Describe your issue..."
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              {isSubmitting ? "Submitting..." : "Create Ticket"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
