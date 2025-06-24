import { Link, useParams } from "react-router";
import { PATHS } from "../PATHS";
import useUser from "../hooks/useUser";
import { useState } from "react";

function ResetPassword() {
  const { key } = useParams<{ key: string }>();
  const { loading, error, resetPassword } = useUser();
  const [success, setSuccess] = useState<boolean>(false);

  async function handleSubmit(formData: FormData) {
    const changed = await resetPassword(key, formData.get("password"));

    if (changed) {
      setSuccess(true);
    }
  }

  return (
    <>
      <form action={handleSubmit}>
        <input
          type="password"
          name="password"
          placeholder="Enter new password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {loading ? <p>Loading ...</p> : null}
      {error && error.status !== 401 ? (
        <p style={{ color: "red" }}>
          Error: {error.message || "Erreur inconnue"}
        </p>
      ) : null}
      {success ? (
        <p>
          password change successfully! You can now{" "}
          <Link to={PATHS.AUTH}>login</Link>
        </p>
      ) : null}
    </>
  );
}

export default ResetPassword;
