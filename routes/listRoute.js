import express from 'express';
import { addProduct, deleteProduct, getUserProducts, updateProduct } from '../controllers/listController.js'; // Import controller functions

const router = express.Router();

// Route to add a new product
router.post('/add-product', addProduct);

// Route to get all products for a specific user
router.get('/products/:userId', getUserProducts);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:productId", updateProduct);
export default router;
