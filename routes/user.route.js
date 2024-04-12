const router=require('express').Router();
const user=require('../controllers/user.controller');
const auth=require('../middlewares/auth')

router.post('/register',user.register);
router.post('/login',user.login);
router.post('/stressLevel',auth,user.stressLevel);
router.get('/profile',auth,user.profile);

module.exports=router;