import {Router} from 'express'
import orderController from '../controllers/order.controller.js'

const routes = Router()

routes.post('/createorder', orderController.createOrder)
routes.put('/updateorder', orderController.updateOrder)
routes.put('/updatestatusorder', orderController.updateStatusOrder)
routes.delete('/deleteorder', orderController.deleteOrder)
routes.get('/getorder', orderController.getOrder)
routes.get('/totalOrdersPerCustomer', orderController.totalOrdersPerCustomer)
routes.get('/totalOrdersPerProduct', orderController.totalOrdersPerProduct)
routes.get('/mostSelledProducts', orderController.mostSelledProducts)

export default routes