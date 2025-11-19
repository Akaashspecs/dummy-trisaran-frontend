import { Timestamp } from "firebase/firestore";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { TbXboxX } from "react-icons/tb";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { loadEncrypted } from "../../../app/utils";
import { apiPost } from "../../lib/api";

// --- Yup Schema ---
const validationSchema = Yup.object({
  profileImage: Yup.string().required("Profile image is required"),
  fullName: Yup.string().required("Full Name is required"),

  aadhaarNumber: Yup.string()
    .matches(/^\d{12}$/, "Aadhaar must be 12 digits")
    .required("Aadhaar number is required"),

  aadhaarPhoto: Yup.string().required("Aadhaar photo required"),

  panNumber: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format")
    .required("PAN number is required"),

  panPhoto: Yup.string().required("PAN photo required"),
});

const KycForm = ({ setKycFormOpen }) => {
  const [aadhaarPreview, setAadhaarPreview] = useState(null);
  const [panPreview, setPanPreview] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const user = loadEncrypted("user");

  // Convert file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  return (
    <div className="h-scree w-screen bg-black/30 absolute h-screen top-0 left-0 z-10 flex justify-center items-center ">
      <div className="rounded-2xl overflow-hidden">
        <div className="bg-white min-w-[500px] max-h-[700px] overflow-y-scroll p-6 relative rounded-2xl overflow-hidden">
          <TbXboxX
            className="text-2xl text-gray-700 cursor-pointer absolute right-4 top-4"
            onClick={() => setKycFormOpen(false)}
          />
          <div className=" w-full text-center text-[20px] font-medium">
            KYC Form
          </div>
          <Formik
            initialValues={{
              profileImage: "",
              fullName: "",
              aadhaarNumber: "",
              aadhaarPhoto: "",
              panNumber: "",
              panPhoto: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const timestamp = Timestamp.fromDate(new Date());
              const uid = localStorage.getItem("uid");
              const kycData = {
                aadharImageBase64: values.aadhaarPhoto.replace(
                  /^data:image\/\w+;base64,/,
                  ""
                ),
                aadharNumber: values.aadhaarNumber,
                fullName: values.fullName,
                panImageBase64: values.panPhoto.replace(
                  /^data:image\/\w+;base64,/,
                  ""
                ),
                panNumber: values.panNumber,
                phoneNumber: user.phone,
                profileImageBase64: values.profileImage.replace(
                  /^data:image\/\w+;base64,/,
                  ""
                ),
                status: "pending",
                storageMethod: "base64",
                submittedAt: timestamp,
                updatedAt: timestamp,
                userId: uid,
              };

              try {
                const response = await apiPost("/api/kyc/create", kycData);
                toast.success("Form submitted successfully!");
                resetForm();
              } catch (error) {
                toast.error(error.message);
              }
            }}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6 ">
                <div className="  flex flex-col items-center">
                  <div
                    className="mt-2 w-24 h-24 border-2 border-dashed rounded-full flex items-center justify-center cursor-pointer relative overflow-hidden bg-gray-50"
                    onClick={() =>
                      document.getElementById("profileUpload").click()
                    }
                  >
                    {!profilePreview && (
                      <p className="text-gray-500 text-sm text-center px-2">
                        Upload Profile Image
                      </p>
                    )}

                    {profilePreview && (
                      <img
                        src={profilePreview}
                        alt="Profile Preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <label className="font-medium mt-2">Profile Image</label>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    id="profileUpload"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const base64 = await convertToBase64(file);
                        setFieldValue("profileImage", base64);
                        setProfilePreview(base64);
                      }
                    }}
                  />

                  <ErrorMessage
                    name="profileImage"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label className="block mb-1 font-medium">Full Name</label>
                  <Field
                    name="fullName"
                    className="w-full border rounded-lg px-3 py-2 border-gray-300 shadow-md"
                    placeholder="Enter full name"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Aadhaar Number */}
                <div>
                  <label className="block mb-1 font-medium">
                    Aadhaar Number
                  </label>
                  <Field
                    name="aadhaarNumber"
                    className="w-full border rounded-lg px-3 py-2 border-gray-300 shadow-md"
                    placeholder="Enter 12 digit Aadhaar number"
                  />
                  <ErrorMessage
                    name="aadhaarNumber"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Aadhaar Photo Upload */}
                <div>
                  <label className="font-medium">Aadhaar Photo</label>

                  <div
                    className="mt-2 w-40 h-40 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer relative overflow-hidden bg-gray-50"
                    onClick={() =>
                      document.getElementById("aadhaarUpload").click()
                    }
                  >
                    {/* If NO image → show text */}
                    {!aadhaarPreview && (
                      <p className="text-gray-500 text-sm text-center px-2">
                        Click to upload Aadhaar Photo
                      </p>
                    )}

                    {/* If image exists → show preview */}
                    {aadhaarPreview && (
                      <img
                        src={aadhaarPreview}
                        alt="Aadhaar Preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="aadhaarUpload"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const base64 = await convertToBase64(file);
                        setFieldValue("aadhaarPhoto", base64);
                        setAadhaarPreview(base64);
                      }
                    }}
                  />

                  <ErrorMessage
                    name="aadhaarPhoto"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* PAN Number */}
                <div>
                  <label className="block mb-1 font-medium">PAN Number</label>
                  <Field name="panNumber">
                    {({ field, form }) => (
                      <input
                        {...field}
                        type="text"
                        maxLength={10}
                        placeholder="ABCDE1234F"
                        className="w-full border rounded-lg px-3 py-2 border-gray-300 shadow-md uppercase"
                        onChange={(e) => {
                          const upper = e.target.value.toUpperCase();
                          form.setFieldValue("panNumber", upper);
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="panNumber"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* PAN Photo Upload */}
                <div className="mt-4">
                  <label className="font-medium">PAN Card Photo</label>

                  <div
                    className="mt-2 w-40 h-40 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer relative overflow-hidden bg-gray-50"
                    onClick={() => document.getElementById("panUpload").click()}
                  >
                    {!panPreview && (
                      <p className="text-gray-500 text-sm text-center px-2">
                        Click to upload PAN Card Photo
                      </p>
                    )}

                    {panPreview && (
                      <img
                        src={panPreview}
                        alt="PAN Preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <input
                    type="file"
                    id="panUpload"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const base64 = await convertToBase64(file);
                        setFieldValue("panPhoto", base64);
                        setPanPreview(base64);
                      }
                    }}
                  />

                  <ErrorMessage
                    name="panPhoto"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default KycForm;
