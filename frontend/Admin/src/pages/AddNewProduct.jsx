import { useContext, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader'
import { AppContext } from '../context/AppContext';

export default function AddNewProduct() {

  const { addNewProduct } = useContext(AppContext);
  const [adding, setAdding] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: files ? files[0] : value,
    }));
  };
    
  const addProduct = async (e) => {
    e.preventDefault();
    setAdding(true);
    const productData = new FormData();
    productData.append('name', formData.name);
    productData.append('description', formData.description);
    productData.append('price', formData.price);
    productData.append('category', formData.category);
    productData.append('image', formData.image);

    try {
      await addNewProduct(productData);
    } catch (error) {
      
    } finally {
      setAdding(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
      })
    }
  }

  return (
    <div className='w-screen h-screen max-h-screen md:pl-2 flex'>
      <Sidebar />

      <div className='w-full flex justify-center items-center p-4 md:p-0'>
        <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Add New Product</h2>
          <form className="flex flex-col gap-4" onSubmit={addProduct} >
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Product Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter product description"
                rows="3"
                required
              />
            </div>

            {/* Product Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price (₹)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter product price"
                required
              />
            </div>

            {/* Product Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                <option value="">Select category</option>
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Sports">Sports</option>
                <option value="Beauty">Beauty</option>
                <option value="ChildCare">ChildCare</option>
              </select>
            </div>

            {/* Product Image */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <input
                id="image"
                type="file"
                name="image"
                onChange={handleChange}
                required
                className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-xl shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={adding}
            >
              {adding ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader/>
                  <p>Adding...</p>
                </div>
              ) : (
                'Add Product'
              )}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
