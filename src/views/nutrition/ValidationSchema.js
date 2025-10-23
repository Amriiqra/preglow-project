import * as Yup from "yup";

export const initialFoodValues = {
    name: "",
    category: "",
};

export const FoodSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Terlalu pendek!")
        .max(50, "Terlalu panjang!")
        .required("Nama makanan wajib diisi"),
    category: Yup.string().required("Kategori wajib dipilih"),
});