import * as Yup from "yup";

export const ForumSchema = Yup.object().shape({
    title: Yup.string()
        .min(5, "Title must be at least 5 characters")
        .required("Title is required"),
    content: Yup.string()
        .min(10, "Content must be at least 10 characters")
        .required("Content is required"),
});

export const commentValidationSchema = Yup.object({
    content: Yup.string()
        .required("Komentar tidak boleh kosong")
        .min(3, "Komentar minimal 3 karakter")
        .max(500, "Komentar maksimal 500 karakter")
});

export const replyValidationSchema = Yup.object({
    content: Yup.string()
        .required("Balasan tidak boleh kosong")
        .min(1, "Balasan minimal 1 karakter")
        .max(500, "Balasan maksimal 500 karakter")
});

export const initialValues = {
    title: "",
    content: "",
};