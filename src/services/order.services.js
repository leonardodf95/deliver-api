import orderRepository from "../repositories/order.repository.js";

async function createOrder(order) {
    return await orderRepository.createOrder(order)
}
async function updateOrder(update){
    return await orderRepository.updateOrder(update)
}
async function updateStatusOrder(update){
    return await orderRepository.updateStatusOrder(update)
}
async function deleteOrder(id){
    return await orderRepository.deleteOrder(id)
}
async function getOrder(id){
    return await orderRepository.getOrder(id)
}

async function totalOrdersPerCustomer(customer){
    return await orderRepository.totalOrdersPerCustomer(customer)
}

async function totalOrdersPerProduct(product){
    return await orderRepository.totalOrdersPerProduct(product)
}

async function mostSelledProducts(){
    return await orderRepository.mostSelledProducts()
}


export default {
    createOrder,
    updateOrder,
    updateStatusOrder,
    deleteOrder,
    getOrder,
    totalOrdersPerCustomer,
    totalOrdersPerProduct,
    mostSelledProducts
}