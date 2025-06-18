import { useContext, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { LoaderCircle, Zap } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function AddNewProduct() {
    const { addNewProduct, addingProduct, autofillProductDetails, callingAI } = useContext(AppContext);

    const [imagePreview, setImagePreview] = useState('/upload-image.png');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
    });

    const handleAI = async () => {
        const res = await autofillProductDetails(formData.image);
        if (res) {
            setFormData(prev => ({
                ...prev,
                name: res.data.title || '',
                description: res.data.description || '',
                price: res.data.price,
            }));
        }
    };

    const handleChange = async (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);

            setFormData((prevData) => ({
                ...prevData,
                [name]: file,
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
        if (!formData.image) return alert("Please select product image");

        const productData = new FormData();
        productData.append('name', formData.name);
        productData.append('description', formData.description);
        productData.append('price', formData.price);
        productData.append('category', formData.category);
        productData.append('image', formData.image);

        await addNewProduct(productData);
        setFormData({ name: '', description: '', price: '', category: '', image: null });
        setImagePreview('/upload-image.png');
    };

    return (
        <div className='w-screen h-screen max-h-screen md:pl-2 flex'>
            <Sidebar />
            <div className='w-full flex justify-center items-center p-4 md:p-0'>
                <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Add New Product</h2>
                    <form className="flex flex-col gap-4" onSubmit={addProduct}>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
                            <label htmlFor="image" className="cursor-pointer">
                                <div className="w-16 h-16 border border-gray-300 rounded-md overflow-hidden p-2">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                                </div>
                            </label>
                            <input id="image" type="file" name="image" onChange={handleChange} className="hidden" />
                        </div>

                        <div>
                            <div className='flex justify-between items-center'>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                                <p
                                    className={`text-xs bg-primary text-white px-3 py-1 flex items-center gap-2 rounded-full shadow-sm ${callingAI ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-hover'}`}
                                    onClick={!callingAI ? handleAI : undefined}
                                >
                                    Autofill with AI <Zap size={16} className="text-yellow-500" />
                                </p>
                            </div>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3" required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
                            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <select id="category" name="category" value={formData.category} onChange={handleChange} required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm">
                                <option value="">Select category</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Sports">Sports</option>
                                <option value="Beauty">Beauty</option>
                                <option value="ChildCare">ChildCare</option>
                            </select>
                        </div>

                        <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-xl" disabled={addingProduct}>
                            {addingProduct ? <div className="flex items-center justify-center gap-2"><LoaderCircle className='animate-spin' /> <p>Adding...</p></div> : 'Add Product'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
