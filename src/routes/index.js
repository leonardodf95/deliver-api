import {Router} from 'express'

const routes = Router()

routes.use('/createorder', CreateOrderController.execute)

export default routes