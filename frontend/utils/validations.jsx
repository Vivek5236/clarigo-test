export const validateLogin = (form) => {
    if (!form.email || !form.password)
        return "All fields are required";

    if (!/\S+@\S+\.\S+/.test(form.email))
        return "Invalid email format";

    if (form.password.length < 6)
        return "Password must be at least 6 characters";

    return null;
};

export const validateUserForm = (form) => {
    if (Object.values(form).some((v) => !v))
        return "All fields are required";

    if (!/\S+@\S+\.\S+/.test(form.email))
        return "Invalid email";

    if (!/^[0-9]{10}$/.test(form.phone))
        return "Phone must be 10 digits";

    return null;
};
