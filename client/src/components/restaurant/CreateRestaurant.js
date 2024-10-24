import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Label from "../ui/Label";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import api from "../../api/client";

const CreateRestaurantForm = ({ restaurant, onClose }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [apiErrors, setApiErrors] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (restaurant) {
      setIsUpdate(true);
      setValue("name", restaurant?.name);
      setValue("description", restaurant?.description);
    }
  }, [restaurant, setValue]);

  const onSubmit = async (data) => {
    try {
      setApiErrors([]);

      const token = localStorage.getItem("jwt");

      const url = isUpdate ? `/restaurants/${restaurant?.id}` : "/restaurants";

      if (isUpdate) {
        await api.patch(url, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post(url, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      isUpdate ? onClose() : navigate("/");
    } catch (error) {
      setApiErrors(error?.response?.data?.errors || []);
    }
  };

  return (
    <div className="mx-auto max-w-xl w-full p-6 overflow-hidden rounded-lg bg-white shadow">
      <form className="space-y-6 mb-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="name">Restaurant name</Label>
          <Input
            id="name"
            type="text"
            error={errors?.name?.message}
            {...register("name", { required: "Name is required" })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            type="text"
            error={errors?.description?.message}
            {...register("description", {
              required: "Description is required",
            })}
          />
        </div>

        <Button type="submit">Create Restaurant</Button>
      </form>
      <Alert errors={apiErrors} setErrors={setApiErrors} />
    </div>
  );
};

export default CreateRestaurantForm;
