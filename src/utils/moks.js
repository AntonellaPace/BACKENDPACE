import { faker } from "@faker-js/faker";
import { generateCode } from "./functions.js";

export const generarProductos = () => {
    return{
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productName(),
        category: faker.commerce.department(), 
        price: parseInt(faker.commerce.price({ min: 1000, max: 2000, dec: 0 })),
        thumbnail: faker.image.avatar(),
        code: generateCode(10),
        stock: parseInt(faker.string.numeric()),
        status: true
    }
}