const express = require('express')

const router = express.Router()

const bcrypt = require('bcryptjs')



const connection = require("../config/db")



router.get("/",(req, res)=>{

    return res.status(200).json({message : 'Api is runing...'})
})

router.post("/addProduct", async (req, res) => {
  try {
    const { title, price, description, category, image } = req.body;
    console.log("Received data:", { title, price, description, category, image });


    const sql = `INSERT INTO product (title, price, description, category, image) VALUES (?, ?, ?, ?, ?)`;

    await connection.execute(sql, [title, price, description, category, image]);

    return res.status(200).json({ message: 'Product added successfully...' });
  } catch (err) {
    console.error("SQL Insert Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getProduct",async(req, res)=>{
    try{
    const result =  await connection.execute('select * from product')
      return res.status(200).json({message : 'fetch successfully...', data : result[0], success:true})
    }catch(err){

        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
})

router.get("/SumCart",async(req,res)=>{

  try{
  var sql = `select sum(price) from cart`
  const result = await connection.execute(sql)
  return res.status(200).json({message:'fetch successfully', data : result[0],success : true})

  }catch(err){
      console.log(err)
        return res.status(500).json({message:"internal server error"})
  }
})
router.post('/register', async(req, res)=>{
  try{
   const {name, email, pass} = req.body
   
   const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(pass, salt)

  
   
    const sql = `insert into user1(name, email, pass) VALUES (?, ?, ?)`;
    
    await connection.execute(sql, [name, email, hashPassword]);
    return res.status(200).json({ message: 'User registered successfully' });
  }catch(err){
      console.log(err)
        return res.status(500).json({message:"internal server error"})
  }

})
router.post('/login', async (req, res) => {
  try {
    const { email, pass } = req.body;

    const sql = `SELECT * FROM user1 WHERE email = ?`;
    const [result] = await connection.execute(sql, [email]);

    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const user = result[0];
    

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (isMatch) {
      req.session.userId = user.id;
      req.session.userName = user.name;
      
    }else{
      return res.status(401).json({ message: 'Invalid password' });
    }

    

    return res.status(200).json({ message: 'Login successful', user: user.name });

  } catch (err) {
    console.log('Login failed:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/checkout', async(req, res) => {
  if (req.session.userId) {
  return res.status(200).json({ success: true, message: "Proceed to checkout"});
  }else{
   return res.status(401).json({ success: false, message: "Please log in to checkout" });
  }

  
 
});






module.exports = router;