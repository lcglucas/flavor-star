import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/ui/Layout";
import Label from "../../components/ui/Label";
import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import api from "../../api/client";

const CreateRestaurant = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, description } = e.target.elements;

    try {
      setErrors([]);

      const token = localStorage.getItem("jwt");

      await api.post(
        "/restaurants",
        {
          name: name.value,
          description: description.value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/");
    } catch (error) {
      setErrors(error?.response?.data?.errors || []);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-xl w-full p-6 overflow-hidden rounded-lg bg-white shadow">
        <form className="space-y-6 mb-5" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Restaurant name</Label>
            <Input id="name" name="name" type="text" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              name="description"
              type="text"
              required
            />
          </div>

          <Button type="submit">Create Restaurant</Button>
        </form>
        <Alert errors={errors} setErrors={setErrors} />
      </div>
    </Layout>
  );
};

export default CreateRestaurant;
