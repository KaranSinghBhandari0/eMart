import { useContext, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { LoaderCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function AddNewProduct() {
    const { addNewProduct, loading } = useContext(AppContext);

    const [imagePreview, setImagePreview] = useState('/upload-image.png');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files && files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set image preview
            };
            reader.readAsDataURL(files[0]); // Read the file as a data URL
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();
        if(!formData.image) {
            alert("Please select product image");
            return;
        }

        const productData = new FormData();
        productData.append('name', formData.name);
        productData.append('description', formData.description);
        productData.append('price', formData.price);
        productData.append('category', formData.category);
        productData.append('image', formData.image);

        await addNewProduct(productData);
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            image: null,
        });
        setImagePreview('/upload-image.png'); // Reset image preview
    };

    return (
        <div className='w-screen h-screen max-h-screen md:pl-2 flex'>
            <Sidebar />

            <div className='w-full flex justify-center items-center p-4 md:p-0'>
                <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Add New Product</h2>
                    <form className="flex flex-col gap-4" onSubmit={addProduct}>
                        {/* Product Image */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Product Image
                            </label>
                            <div className="mt-1 gap-4">
                                {/* Clickable Image Preview */}
                                <label htmlFor="image" className="cursor-pointer">
                                    <div className="w-16 h-16 border border-gray-300 rounded-md overflow-hidden p-2">
                                        <img
                                            src={imagePreview}
                                            alt="Product Preview"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </label>
                                {/* Hidden File Input */}
                                <input
                                    id="image"
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 px-4 rounded-xl shadow-sm hover:bg-opacity-90"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <LoaderCircle className='animate-spin' />
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