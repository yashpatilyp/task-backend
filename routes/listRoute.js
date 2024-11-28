import express from 'express';
import { addProduct, deleteProduct, getUserProducts, updateProduct } from '../controllers/listController.js'; // Import controller functions

const router = express.Router();


router.post('/add-product', addProduct);


router.get('/products/:userId', getUserProducts);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:productId", updateProduct);
export default router;
