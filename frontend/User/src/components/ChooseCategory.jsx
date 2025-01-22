import { useNavigate } from 'react-router-dom';

export default function ChooseCategory() {
    const navigate = useNavigate();

    const handleCategory = (category) => {
        navigate(`/product/category/${category}`);
    }

return (
    <div className='mt-8'>
        <p className='font-bold text-center font-tilted text-3xl'>Shop By Category</p>
        <div className='flex justify-center items-center gap-8 flex-wrap  mt-4'>
            <div onClick={()=> handleCategory('Clothing')} >
                <img src="/clothing.avif" alt="" className='h-[100px] w-[100px] cursor-pointer rounded-lg' />
                <p className='text-center text-sm'>Clothing</p>
            </div>
            <div onClick={()=> handleCategory('Electronics')} >
                <img src="/electronics.avif" alt="" className='h-[100px] w-[100px] cursor-pointer rounded-lg' />
                <p className='text-center text-sm'>Electronics</p>
            </div>
            <div onClick={()=> handleCategory('Furniture')} >
                <img src="/furniture.avif" alt="" className='h-[100px] w-[100px] cursor-pointer rounded-lg' />
                <p className='text-center text-sm'>Furniture</p>
            </div>
            <div onClick={()=> handleCategory('Beauty')} >
                <img src="/beauty.avif" alt="" className='h-[100px] w-[100px] cursor-pointer rounded-lg' />
                <p className='text-center text-sm'>Beauty</p>
            </div>
            <div onClick={()=> handleCategory('Sports')} >
                <img src="/sports.jpg" alt="" className='h-[100px] w-[100px] cursor-pointer rounded-lg' />
                <p className='text-center text-sm'>Sports</p>
            </div>
            <div onClick={()=> handleCategory('ChildCare')} >
                <img src="/childCare.jpg" alt="" className='h-[100px] w-[100px] cursor-pointer rounded-lg' />
                <p className='text-center text-sm'>Child Care</p>
            </div>
        </div>
    </div>
  )
}
