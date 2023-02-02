import { count } from "console";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

async function createOrder(order){
    const data = JSON.parse(await readFile('pedidos.json'))

    order = {
        id: data.nextId++,
        cliente: order.cliente,
        produto: order.produto,
        valor: order.valor,
        entregue: false,
        timestamp: new Date()
    }

    data.pedidos.push(order)

    await writeFile("pedidos.json", JSON.stringify(data, null, 2));

    return order
}

async function updateOrder(update){
    const data = JSON.parse(await readFile('pedidos.json'))
    const index = data.pedidos.findIndex(x=> x.id === update.id)

    if(index === -1) {
        throw new Error("Pedido não existe!")
    }

    if(update.cliente){
        data.pedidos[index].cliente = update.cliente
    }
    if(update.produto){
        data.pedidos[index].produto = update.produto
    }
    if(update.entregue){
        data.pedidos[index].entregue = update.entregue
    }
    if(update.valor){
        data.pedidos[index].valor = update.valor
    }

    await writeFile("pedidos.json", JSON.stringify(data, null, 2));

    return update
}

async function updateStatusOrder(update){
    const data = JSON.parse(await readFile('pedidos.json'))
    const index = data.pedidos.findIndex(x=> x.id === update.id)

    if(index === -1) {
        throw new Error("Pedido não existe!")
    }

    data.pedidos[index].entregue = update.entregue

    await writeFile("pedidos.json", JSON.stringify(data, null, 2));

    return update
}

async function deleteOrder(id){
    const data = JSON.parse(await readFile('pedidos.json'))
    data.pedidos = data.pedidos.filter(pedido => pedido.id !== parseInt(id, 10))
    
    await writeFile("pedidos.json", JSON.stringify(data, null, 2));
}

async function getOrder(id){
    const data = JSON.parse(await readFile('pedidos.json'))
    const response = data.pedidos.filter(pedido => pedido.id === parseInt(id, 10))
    if(response.length===0) throw new Error("Não existe pedido com esse ID.")
    return response;
}

async function totalOrdersPerCustomer(customer){
    const data = JSON.parse(await readFile('pedidos.json'))
    const response = data.pedidos.filter(pedido => String(pedido.cliente).toUpperCase() === customer.toUpperCase() && pedido.entregue)
    
    let initial = 0
    response.map((order) => initial += order.valor)

    return initial
}

async function totalOrdersPerProduct(product){
    const data = JSON.parse(await readFile('pedidos.json'))
    const response = data.pedidos.filter(pedido => String(pedido.produto).toUpperCase() === product.toUpperCase() && pedido.entregue)
    
    let initial = 0
    response.map((order) => initial += order.valor)

    return initial
}

async function mostSelledProducts(){
    const data = JSON.parse(await readFile('pedidos.json'))

    
    let produtos = []
    let compare;

    for(let i = 0; i < data.pedidos.length; i++){
        compare = data.pedidos[i].produto;
        
        let alredyColect = produtos.filter((x)=> x.produto === compare)
        
        if(alredyColect.length > 0){continue}
        
        let count = 0
        data.pedidos.map((pedido) => {if(pedido.produto === compare && pedido.entregue){count++}})

        produtos.push({produto: compare, quantidade: count})
    }

    produtos.sort((a,b)=>{ return b.quantidade - a.quantidade})

    return produtos
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