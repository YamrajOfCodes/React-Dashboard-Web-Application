import { useState, useEffect } from "react";

export default function UserModal({ onClose, onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "male",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        gender: initialData.gender || "male",
      });
    }
  }, [initialData]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(form);
  };

  return (

    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center"
      onClick={onClose}  
    >
       <div className="fixed inset-0 bg-black/30 flex justify-center items-center" onClick={(e)=>{e.stopPropagation()}}>
      <div className="bg-white p-6 rounded-lg w-80">

        <h2 className="text-lg font-semibold mb-4">
          {initialData?.id ? "Edit User" : "Add User"}
        </h2>

        <input
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          className="w-full border p-2 mb-1 rounded"
        />
        {errors.firstName && (
          <p className="text-red-500 text-xs mb-2">{errors.firstName}</p>
        )}

        <input
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full border p-2 mb-1 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mb-2">{errors.email}</p>
        )}

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full border p-2 mb-1 rounded"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mb-2">{errors.phone}</p>
        )}

        <select
          value={form.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    </div>
   
  );
}