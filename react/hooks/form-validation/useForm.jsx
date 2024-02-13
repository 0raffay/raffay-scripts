//Hook
function useForm(submit, initialValues = {}) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");

    const formErrorMessage = "Please fill out the required field";

    function handleSubmit(event) {
        event.preventDefault();

        if (errorOnForm()) {
            setFormError(formErrorMessage);
            return;
        } else {
            setFormError("");
            submit();
        }
    }

    function errorOnForm() {
        const noErrors = Object.values(errors).every((error) => error == "");
        const valuesFilled = Object.keys(values).length !== 0;

        return !(noErrors && valuesFilled);
    }

    function handleInput(e) {
        const { name, value } = e.target;
        let regex;
        switch (e.target.type) {
            case "email":
                regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                break;
            case "tel":
                regex = new RegExp(/^\d{8,}$/);
                break;
            default:
                null;
        }

        validate({
            name: name,
            value: value,
            errorName: e.target.name,
            regex: regex,
        });

        setValues({
            ...values,
            [name]: value,
        });
    }

    function validate({ name, value, regex, errorName }) {
        let newErrors = { ...errors };
        if (value == "") {
            newErrors[name] = "Please fill this field";
        } else {
            newErrors[name] = "";
        }

        if (regex) {
            if (!regex.test(value)) {
                newErrors[name] = `Please enter a valid ${errorName ?? "data"}`;
            } else {
                newErrors[name] = "";
            }
        }

        if (!errorOnForm()) {
            setFormError("");
        }

        setErrors(() => newErrors);
        return newErrors;
    }

    return { handleInput, handleSubmit, values, errors, formError };
}

//Use
function App() {
    const { handleInput, handleSubmit, values, errors, formError } = useForm(
        () => {
            alert("working peacefully");
            console.log(values);
        }
    );
    return (
        <>
            <form
                onSubmit={handleSubmit}
                action=""
                className="w-full col-span-1 col-start-2 col-end-2 relative"
            >
                <Input
                    name="Email Address"
                    className="mb-5"
                    label="Email Address"
                    placeholder="Enter Your Email Address"
                    type="email"
                    onChange={handleInput}
                    error={errors["Email Address"] ?? null}
                />

                <Input
                    name="Phone Number"
                    className="mb-5"
                    label="Phone Number"
                    placeholder="Enter Your Phone Number"
                    type="tel"
                    onChange={handleInput}
                    attributes={{ ["data-regex"]: "^d{8}$" }}
                    error={errors["Phone Number"] ?? null}
                />

                <Button className="w-full" attributes={{ type: "submit" }}>
                    Submit
                </Button>

                {formError && formError.length && (
                    <p className=" text-red-500 absolute -bottom-6 text-[14px] font-bold">
                        {formError}
                    </p>
                )}
            </form>
        </>
    );
}
