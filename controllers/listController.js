import { List } from '../models/listSchema.js'; // Import the List model

// Add a new product to the list
export const addProduct = async (req, res) => {
          try {
            const { productname, quantity, description, rate, userId } = req.body;
        
            // Validate if all required fields are provided
            if (!productname || !quantity || !description || !rate || !userId) {
              return res.status(400).json({ message: 'All fields are required' });
            }
        
            // Ensure quantity is a valid number
            const numericQuantity = parseInt(quantity, 10);
            if (isNaN(numericQuantity)) {
              return res.status(400).json({ message: 'Quantity must be a valid number' });
            }
        
            // Log the incoming request data for debugging
            console.log("Incoming Product Data:", req.body);
        
            // Create a new product
            const newProduct = new List({
              productname,
              quantity: numericQuantity, // Ensure quantity is saved as a number
              description,
              rate,
              userId
            });
        
            // Save the product to the database
            const savedProduct = await newProduct.save();
            return res.status(201).json(savedProduct);
          } catch (error) {
            console.error("Error while adding product:", error);
            return res.status(500).json({ message: 'Server error while adding product' });
          }
        };
        
// Fetch all products for a specific user
export const getUserProducts = async (req, res) => {
  try {
    // Assuming userId is passed in the request body or extracted from JWT
    const userId = req.params.userId; // Get userId from params

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Fetch all products by the userId (assuming userId is stored in the List schema)
    const products = await List.find({ userId });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for this user' });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while fetching products' });
  }
};




// Delete a product by ID
export const deleteProduct = async (req, res) => {
          try {
            const { id } = req.params;
        
            // Check if the product ID is provided
            if (!id) {
              return res.status(400).json({ message: "Product ID is required" });
            }
        
            // Find and delete the product
            const deletedProduct = await List.findByIdAndDelete(id);
        
            if (!deletedProduct) {
              return res.status(404).json({ message: "Product not found" });
            }
        
            return res.status(200).json({ message: "Product deleted successfully" });
          } catch (error) {
            console.error("Error deleting product:", error);
            return res.status(500).json({ message: "Server error while deleting product" });
          }
        };
        


        // Update product by ID
export const updateProduct = async (req, res) => {
          try {
            const { productId } = req.params;
            const { productname, description, quantity, rate } = req.body;
        
            // Validate required fields
            if (!productname || !description || !quantity || !rate) {
              return res.status(400).json({ message: "All fields are required" });
            }
        
            // Find and update the product
            const updatedProduct = await List.findByIdAndUpdate(
              productId,
              { productname, description, quantity, rate },
              { new: true } // Return the updated document
            );
        
            if (!updatedProduct) {
              return res.status(404).json({ message: "Product not found" });
            }
        
            res.status(200).json(updatedProduct);
          } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).json({ message: "Server error while updating product" });
          }
        };
        