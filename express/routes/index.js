import express from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })


const router = express.Router();

router.post('/profile',upload.array('files'), async (req,resp)=>{
    //TODO : handle req.files
    return resp.json({ success: true });
});


export default router;