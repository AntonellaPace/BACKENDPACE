export const getErrorInfo = (box, type) => {

    switch (type) {
        case 1:
            return `Datos incompletos o no validos,
            Se estaperaba:
            - Name: String, pero se recibio ${box.first_name}
            - Lastname: String, pero se recibio ${box.last_name}
            - Email: String, pero se recibio ${box.email}`;

        case 2: 
            return `Datos incompletos o no validos,
            Se esperaba:
            - Title         : Debe ser un String, pero se recibio ${box.title}
            - Category      : Debe ser un String, pero se recibio ${box.category}
            - Description   : Debe ser un String, pero se recibio ${box.description}
            - Price         : Debe ser un Number, pero se recibio ${box.price}
            - Code          : Debe ser un String, pero se recibio ${box.code}`;
            
        case 3:
            return `Producto ${box.title} con id: ${box._id} no encontrado`;

        case 4:
            return `El codigo ${box.code} ya existe`;

        case 5:
            return `Error en la BASE DE DATOS`;

        case 6: 
            return `El carrito con id: ${box.cid}, no existe`

        default:
            return `Error no determinado`
    }
}