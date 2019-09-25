import express from 'express';

const router = express.Router();

router.post('/profile',async (req,resp)=>{
    return resp.json({ success: true });
});


export default router;