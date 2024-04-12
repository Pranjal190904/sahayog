const router=require('express').Router();
const user=require('../controllers/user.controller');
const auth=require('../middlewares/auth')
const counsellor=require('../controllers/counsellor.controller');

router.get('/list',auth,counsellor.counsellors);

module.exports=router;