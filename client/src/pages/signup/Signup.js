import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Label from "../../components/ui/Label";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Link from "../../components/ui/Link";
import Alert from "../../components/ui/Alert";
import api from "../../api/client";
import Logo from "../../assets/logo.png";
import { UserContext } from "../../context/UserContext";

const SignupPage = () => {
  const navigate = useNavigate();

  const { login } = useContext(UserContext);
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { full_name, email, password } = e.target.elements;

    try {
      setErrors([]);

      const { data } = await api.post("/users", {
        full_name: full_name.value,
        email: email.value,
        password: password.value,
      });

      if (data?.jwt) {
        login(data.user, data.jwt);
        navigate("/");
      }
    } catch (error) {
      setErrors(error?.response?.data?.errors || []);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Logo" src={Logo} className="mx-auto h-28 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Full name</Label>
            <Input id="full_name" name="full_name" type="text" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="new-email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
            />
          </div>

          <Button type="submit">Sign up</Button>
        </form>

        <p className="mt-10 mb-5 text-center text-sm text-gray-500">
          Already has an account? <Link to="/signin">Signin</Link>
        </p>

        <Alert errors={errors} setErrors={setErrors} />
      </div>
    </div>
  );
};

export default SignupPage;
