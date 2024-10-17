import { useState } from "react";
import get from "lodash";

import Label from "../../components/ui/Label";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Link from "../../components/ui/Link";
import Alert from "../../components/ui/Alert";
import api from "../../api/client";

const SigninPage = () => {
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      setErrors([]);

      const { data } = await api.post("/login", {
        email: email.value,
        password: password.value,
      });

      const jwt = get(data, "jwt", null);
      if (jwt) {
        localStorage.setItem("flavor_jwt", jwt);
      }
    } catch (error) {
      setErrors(error?.response?.data?.errors || []);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>

          <Button type="submit">Sign in</Button>
        </form>

        <p className="mt-10 mb-5 text-center text-sm text-gray-500">
          Not a member? <Link to="/signup">Create an account</Link>
        </p>

        <Alert errors={errors} setErrors={setErrors} />
      </div>
    </div>
  );
};

export default SigninPage;
