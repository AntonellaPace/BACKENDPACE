import ProductService from "../services/products.services.js";

const productService = new ProductService();

class ProductController {
    async deleteProduct(req, res, next) {
        try {
            const pid = req.params.pid;
            const deletedProduct = await productService.deleteProduct(pid);

            req.logger.info(`Producto eliminado ${deletedProduct}`);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const pid = req.params.pid;
            const prod = req.body;
            const newProduct = await productService.updateProduct(pid, {...prod});

            req.logger.info(`Producto actualizado ${newProduct}`);
            res.redirect("/products");
        } catch (error) {
            next(error);
        }
    }

    async getProducts(req, res, next) {
        try {
            const { limit = 4, page = 1, sort, query } = req.query;
            let firstPage = false;
    
            const products = await productService.getProducts({
                limit: parseInt(limit),
                page: parseInt(page),
                sort,
                query
            });
    
            if(!products.hasPrevPage){
                firstPage = true;
            }

            res.render("home", {
                status: "success",
                payload: products.docs,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                currentPage: products.page,
                totalPages: products.totalPages,
                nextLink: products.hasNextPage ? products.nextPage : null,
                prevLink: products.hasPrevPage ? products.prevPage : null,
                firstPage,
                limit,
                userName: req.user.first_name, 
                rol: req.user.rol === "admin" ? 1 : 0,
                cid: req.user.cart
            });
        } catch (error) {
            next(error);
        }
    }

    async addProduct(req, res, next) {
        try {
            const {title, description, category, price, thumbnail, code, stock} = req.body;
            const newProduct = await productService.addProduct(title, description, category, price, thumbnail, code, stock);
        
            req.logger.info(`El producto: ${newProduct}, fue creado creado`);
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req, res, next) {
        try {
            const pid = req.params.pid;
            const product = await productService.getProductById(pid);

            req.logger.info(product);
        } catch (error) {
            next(error);
        }
    }
}

export default ProductController;