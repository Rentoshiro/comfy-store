import { useNavigation } from "react-router-dom";

function SubmitBtn({ text }) {
  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      className="btn btn-primary uppercase btn-block"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span>
          sending...
        </>
      ) : (
        text || "submit"
      )}
    </button>
  );
}

export default SubmitBtn;
