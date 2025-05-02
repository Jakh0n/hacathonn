import { Router } from 'express'
import {
	getTenantConfig,
	getTenantDetails,
} from '../controllers/tenant-controller'

const router: Router = Router()

router.get('/:id', getTenantDetails)
router.get('/config/:tenantId', getTenantConfig)

export default router
