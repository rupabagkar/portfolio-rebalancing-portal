import express from 'express';
import { ProposalsController } from '../controllers/proposals.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', ProposalsController.get);
router.put('/:proposalId/approve', ProposalsController.putProposalIdApprove);
router.get('/:proposalId', ProposalsController.getProposalId);
router.post('/', ProposalsController.post);
router.put('/:proposalId', ProposalsController.putProposalId);

export default router;
