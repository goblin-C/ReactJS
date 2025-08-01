import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Button from "./Button";
import ProductUpload from "./ProductUpload";

export default function ProductInput({
  fields = [],
  onSubmit,
  isLoading = false,
  initialData = null,
  buttonText = "Add",
}) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [apiErrors, setApiErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Prefill form data when initialData is provided
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleImageUploaded = (url) => {
    setFormData((prev) => ({ ...prev, image_url: url }));

    // Clear image error when upload succeeds
    if (errors.image_url && url) {
      setErrors((prev) => ({ ...prev, image_url: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    fields.forEach((field) => {
      const value = formData[field.name];

      // Required field check
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
        return; // Skip other checks if missing
      }

      if (value) {
        // String length validations
        if (typeof value === "string") {
          if (field.minLength && value.length < field.minLength) {
            newErrors[
              field.name
            ] = `${field.label} must be at least ${field.minLength} characters`;
          }
          if (field.maxLength && value.length > field.maxLength) {
            newErrors[
              field.name
            ] = `${field.label} must be at most ${field.maxLength} characters`;
          }
        }

        // Number validations
        if (field.type === "number") {
          const numericValue = parseFloat(value);
          if (!isNaN(numericValue)) {
            if (field.min !== undefined && numericValue < field.min) {
              newErrors[
                field.name
              ] = `${field.label} must be at least ${field.min}`;
            }
            if (field.max !== undefined && numericValue > field.max) {
              newErrors[
                field.name
              ] = `${field.label} must be at most ${field.max}`;
            }
          }
        }

        // Regex / pattern validation
        if (field.pattern) {
          const regex = new RegExp(field.pattern);
          if (!regex.test(value)) {
            newErrors[field.name] = `${field.label} format is invalid`;
          }
        }
      }
    });

    // Validate image upload (if required)
    if (!formData.image_url) {
      newErrors["image_url"] = "Please upload an Image";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear API errors when field changes
    if (apiErrors[name]) {
      setApiErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Only clear errors when a field has a value, don't add new errors on change
    if (formSubmitted && value) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    // Validate all fields
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    // Clear any previous API errors
    setApiErrors({});

    try {
      // Call onSubmit if provided and form is valid
      if (onSubmit) {
        await onSubmit(formData);
      }
    } catch (error) {
      // Handle specific API errors
      if (error.message === "AlreadyExists") {
        setApiErrors({ title: "A Product with this title already exists" });
      }
    }
  };

  // Group fields for layout (description gets its own row)
  const renderFields = () => {
    const normalFields = fields.filter((field) => field.type !== "textarea");
    const textareaFields = fields.filter((field) => field.type === "textarea");

    // Render normal fields in pairs
    const pairs = [];
    for (let i = 0; i < normalFields.length; i += 2) {
      const pair = normalFields.slice(i, i + 2);
      pairs.push(pair);
    }

    return (
      <>
        <ProductUpload
          onImageUploaded={handleImageUploaded}
          error={errors.image_url}
          initialImageUrl={formData.image_url}
        />

        {/* Render pairs of normal fields */}
        {pairs.map((pair, index) => (
          <div key={index} className="flex gap-4 mb-6">
            {pair.map((field) => (
              <div key={field.name} className="flex-1">
                <label
                  htmlFor={field.name}
                  className="text-label-text text-[#5E6366] mb-[6px] block"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  min={4}
                  max={10000000}
                  minLength={4}
                  maxLength={10000000}
                  className={`w-full border ${
                    apiErrors[field.name] || errors[field.name]
                      ? "border-red-500"
                      : "border-[#DDE2E4]"
                  } rounded-[8px] p-2 focus:outline-none focus:ring-2 focus:ring-[#5E6366]`}
                  disabled={isLoading}
                />

                {(errors[field.name] || apiErrors[field.name]) && (
                  <p className="text-red-500 text-sm mt-1">
                    {apiErrors[field.name] || errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Render textarea fields (each on its own row) */}
        {textareaFields.map((field) => (
          <div key={field.name} className="mb-6">
            <label
              htmlFor={field.name}
              className="text-label-text text-[#5E6366] mb-[6px] block"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={handleChange}
              min={1}
              max={10000000}
              minLength={1}
              maxLength={10000000}
              className={`w-full border ${
                apiErrors[field.name] || errors[field.name]
                  ? "border-red-500"
                  : "border-[#DDE2E4]"
              } rounded-[8px] p-2 focus:outline-none focus:ring-2 focus:ring-[#5E6366]`}
              rows={4}
              disabled={isLoading}
            />

            {(errors[field.name] || apiErrors[field.name]) && (
              <p className="text-red-500 text-sm mt-1">
                {apiErrors[field.name] || errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      {renderFields()}
      <Button
        buttonText={buttonText}
        width="375px"
        isLoading={isLoading}
        disabled={isLoading}
      />
    </form>
  );
}
