import { promises as fs } from fs;

const { readFile, WriteFile } = fs;

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
}