import { useState, type FormEvent } from "react";
import { useLogin } from "../../hooks/useLogin";

function Signup() {
  const { mutate, isPending, error } = useLogin(false);

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) return;
    mutate({ email, password });
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

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
        {isPending ? "Loading..." : "Sign up"}
      </button>
      {error && <div className="error">{error.response?.data.error ?? ""}</div>}
    </form>
  );
}

export default Signup;
