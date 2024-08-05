import supertest from "supertest";
import {expect} from "chai";

const requester = supertest ("http://localhost:8080")

describe("Testing de la APP WEB E-COMMERCE", () => {
    describe("Testing de Products: ", () => {
        it("POST /products debe crear un producto", async () => {
            const mockProduct = {
                title: "Silla plegable", 
                description: "descripcion", 
                category: "Comedor", 
                price: 2000, 
                thumbnail: "", 
                code: "005", 
                stock: 100,
            }

            const {statusCode, ok, _body} = await requester.post("/api/products").send(mockProduct);

            console.log(statusCode);
            console.log(ok);
            console.log(_body);

            expect(_body.payload).to.have.property("_id")
        });
    });
});