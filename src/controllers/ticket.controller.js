import TicketService from "../services/ticket.services.js";
import CartService from "../services/carts.services.js";
import ProductService from "../services/products.services.js";

const ticketService = new TicketService();
const cartService = new CartService();
const productService = new ProductService();

class TicketController {
    async deleteTicket(req, res) {
        try {
            const tid = req.params.tid;
            const deletedTicket = await cartService.deleteCart(tid);

            req.logger.info(`El ticket ${deletedTicket} ha sido eliminado`);
        } catch (error) {
            req.logger.error(`No se pudo eliminar el Ticket: ${error}`);
        }
    }

    async generateTicket(req, res) {
        try {
            const cid = req.params.cid;
            const cartSource = await cartService.getCartById(cid);
            const cart = await cartService.getCartById(cid);
            let cartNew = [];
            let flag = false;
            let index = 0;

            for (const item of cartSource.products) {
                const product = await productService.getProductById(item.product._id);

                if (product.stock < item.quantity) {
                    cartNew.push(...cart.products.splice(index, 1));
                    if(index != 0) index++;
                    flag = true;
                }else{
                    product.stock -= item.quantity;
                    await productService.updateProduct(item.product._id, product);
                    index++;
                }
            }

            if(flag) await cartService.updateCart(cid, cartNew);
            const ticket = await ticketService.generateTicket(cart);
            req.logger.info(`Ticket creado, Nº codigo: ${ticket.code} ${!flag ? "." : "Hay productos que no pudieron ser agregados"}`);
            res.render("ticketGenerado", {ticket: ticket.code, amount: ticket.amount, productos: cart.products});

        } catch (error) {
            req.logger.error(`Error al generar el Ticket, ${error}`);
        }
    }

    async getTickets(req, res) {
        try {
            const tickets = await ticketService.getTickets();

            req.logger.info(`Ticket creado: ${tickets}`);
        } catch (error) {
            req.logger.error(`Error al obtener los Tickets: ${error}`);
        }
    }
}

export default TicketController;