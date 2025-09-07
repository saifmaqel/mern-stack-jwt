import { useState, type FormEvent } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Link } from "react-router-dom";

function Signup() {
  const { mutate, isPending, error } = useLogin(true);

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) return;
    mutate({ email, password });
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email ?? ""}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password ?? ""}
      />

      <button disabled={!email || !password}>
        {isPending ? "Loading..." : "Log in"}
      </button>
      <Link to={"/signup"}>
        <span>Create New Account</span>
      </Link>
      {error && <div className="error">{error.response?.data.error ?? ""}</div>}
    </form>
  );
}

export default Signup;
