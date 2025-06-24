import useUser from "../../../hooks/useUser";

function RequestPassword() {
  const { loading, error, requestPasswordReset } = useUser();

  function handleSubmit(formData: FormData) {
    requestPasswordReset(formData.get("email"));
  }
  return (
    <>
      <form action={handleSubmit}>
        <input type="email" name="email" placeholder="Enter your email" />
        <button type="submit">Request Password Reset</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        </div>
      )}
    </>
  );
}

export default RequestPassword;
