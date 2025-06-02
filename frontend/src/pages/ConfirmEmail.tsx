import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { PATHS } from "../PATHS";
import useUser from "../hooks/useUser";

function ConfirmEmail() {
  const { key } = useParams<{ key: string }>();
  const { loading, error, confirmEmail } = useUser();

  useEffect(() => {
    confirmEmail(key);
  }, [key]);
  return (
    <>
      {loading ? <p>Loading ...</p> : null}
      {error && error.status !== 401 ? (
        <p style={{ color: "red" }}>
          Error: {error.message || "Erreur inconnue"}
        </p>
      ) : (
        <p>
          Email confirmed successfully! You can now{" "}
          <Link to={PATHS.AUTH}>login</Link>
        </p>
      )}
    </>
  );
}

export default ConfirmEmail;
