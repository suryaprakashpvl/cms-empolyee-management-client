import { useState } from "react";
import {login} from "../../services/authService.js"
import { showSuccess, showError } from "../../utils/toast";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

 const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log(formData);

    try {
      const data = await login(formData);
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
      showSuccess("Login successful");
    } catch (err) {
      console.error(err);
      showError("Invalid email or password");
      setErrors({ form: "Invalid email or password" });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <h1>Employee Portal</h1>
          <p>
            Manage employees, departments, attendance and organization data
            from one place.
          </p>
        </div>

        <div className="login-right">
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Sign in to continue</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="text"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <button className="login-btn" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;