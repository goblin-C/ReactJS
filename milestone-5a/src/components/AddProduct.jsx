import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductInput from "./ProductInput";
import Toast from "./Toast";
import { getAPI, postAPI, putAPI } from "../services/api";

const inputFields = [
  {
    label: "Title",
    name: "title",
    type: "text",
    placeholder: "Enter title",
    required: true,
  },
  {
    label: "Price",
    name: "price",
    type: "number",
    placeholder: "Enter price",
    required: true,
  },
  {
    label: "Description",
    name: "description",
    type: "textarea",
    placeholder: "Enter description",
    required: true,
  },
];

export default function AddProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const isUpdateMode = Boolean(productId);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [initialData, setInitialData] = useState(
    null
  );
  // Fetch product data for update mode
  useEffect(() => {
    if (isUpdateMode && productId) {
      const fetchProduct = async () => {
        try {
          setIsLoadingData(true);
          const response = await getAPI(`products/${productId}`);
          console.log(response);
          if (!response.error) {
            const product = response.data;
            setInitialData({
              title: product.title,
              price: product.price.toString(),
              description: product.description,
              image_url: product.images[0],
            });
          }
          
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setIsLoadingData(false);
        }
      };

      fetchProduct();
    }
  }, [isUpdateMode, productId]);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      const productData = {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description || "No description provided",
        categoryId: 1,
        images: [formData.image_url],
      };

      let response;
      if (isUpdateMode && productId) {
        // Update existing product
        response = await putAPI(`products/${productId}`, productData);
      } else {
        // Create new product
        response = await postAPI("products", productData);
      }

      if (response.error) {

        if (response.data && typeof response.data === "object") {
          const errorData = response.data;

          if (
            errorData.code === "SQLITE_CONSTRAINT_UNIQUE" ||
            (errorData.message &&
              typeof errorData.message === "string" &&
              errorData.message.includes("UNIQUE constraint failed"))
          ) {
            throw new Error("TITLE_EXISTS");
          } else {
            setToastMessage(
            `Failed to ${
                isUpdateMode ? "update" : "add"
            } product. Please check the form for errors.`
            );
            setToastType("error");
            setShowToast(true);
          }
        }

        throw new Error("API_ERROR");
      } else {
        // Success - redirect to home page with toast
        navigate("/", {
          state: {
            showToast: true,
            toastMessage: `Product ${
              isUpdateMode ? "updated" : "added"
            } successfully!`,
            toastType: "success",
          },
        });
      }

      return { success: true };
    } catch (error) {
      console.error("Error submitting product:", error);

      if (error.message !== "TITLE_EXISTS") {
        setToastMessage("An unexpected error occurred.");
        setToastType("error");
        setShowToast(true);
      }

      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };
  
  // Handle loading state for initial data fetch only
  if (isLoadingData && isUpdateMode) {
    return (
      <div className="ml-10 mr-[29px]">
        <div className="flex justify-center items-center h-64 text-gray-500">
          <p>Your Products are being loaded...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="ml-[42px] w-[850px]">
      <div className="flex flex-row justify-between items-center pt-8 pb-2 border-b border-b-[#E5E9EB]">
        <h1 className="text-product-header-text">
          {isUpdateMode ? "Update Product" : "Add Product"}
        </h1>
      </div>
      <div className="relative">
        {showToast && (
          <div className="fixed top-3 right-3 z-50">
            <Toast
              message={toastMessage}
              type={toastType}
              onClose={handleCloseToast}
            />
          </div>
        )}
        <ProductInput
          fields={inputFields}
          onSubmit={handleFormSubmit}
          isLoading={isSubmitting}
          initialData={initialData}
          buttonText={isUpdateMode ? "Update" : "Add"}
        />
      </div>
    </div>
  );
}