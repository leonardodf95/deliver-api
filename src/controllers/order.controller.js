import orderServices from "../services/order.services.js";

async function createOrder(req, res, next) {
    try {
        let order = req.body;
        if(!order.cliente || !order.produto || order.valor === null){
            throw new Error("Campos clientes, produtos e valor precisam ser informados.")
        }
        order = await orderServices.createOrder(order)
        res.send(order);
    } catch (error) {
        next(error)
    }
}

async function updateOrder(req, res, next){
    try {
        let update = req.body;
        update = await orderServices.updateOrder(update)
        res.send(update);
    } catch (error) {
        next(error)
    }
}

async function updateStatusOrder(req, res, next){
    try {
        let update = req.body;
        update = await orderServices.updateStatusOrder(update)
        res.send(update);
    } catch (error) {
        next(error)
    }
}

async function deleteOrder(req, res, next){
    try {
        let {id} = req.body;
        orderServices.deleteOrder(id)
        res.send("ok");
    } catch (error) {
        next(error)
    }
}

async function getOrder(req, res, next){
    try {
        let {id} = req.body;
        const reponse = await orderServices.getOrder(id)
        res.send(reponse);
    } catch (error) {
        next(error)
    }
}

async function totalOrdersPerCustomer(req, res, next){
    try {
        const {cliente} = req.body;
        const response = await orderServices.totalOrdersPerCustomer(cliente)

        res.send({'Total': response})
    } catch (error) {
        next(error)
    }
}

async function totalOrdersPerProduct(req, res, next){
    try {
        const {produto} = req.body;
        const response = await orderServices.totalOrdersPerProduct(produto)

        res.send({'Total': response})
    } catch (error) {
        next(error)
    }
}

async function mostSelledProducts(req, res, next){
    try {
        const response = await orderServices.mostSelledProducts()

        res.send(response)
    } catch (error) {
        next(error)
    }
}

export default {
    createOrder,updateOrder,updateStatusOrder,deleteOrder,getOrder, totalOrdersPerCustomer, totalOrdersPerProduct, mostSelledProducts
}