export default function validateCreateProduct(values) {
    let errors = {};

    if (!values.name) errors.name = "El nombre es obligatorio";

    if (!values.company) errors.company = "Nombre de empresa es obligatorio";
    
    if (!values.url) {
        errors.url = "La URL del producto es obligatoria";
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = "URL no válida";
    }

    if (!values.description) errors.description = "Agrega una descripción a tu producto";
    
    return errors;
};