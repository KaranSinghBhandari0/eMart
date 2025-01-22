export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white flex flex-col items-center py-5 gap-5 text-center mt-auto">
      <div className="w-full flex justify-evenly items-center flex-wrap">
        <div className="flex flex-col items-center gap-2 my-2">
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
        <div className="flex flex-col items-center gap-2 my-2">
          <a href="#" className="hover:underline">Refund Policy</a>
          <a href="#" className="hover:underline">Shipping Policy</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
        <div className="flex flex-col items-center gap-2 my-2">
          <a href="#" className="hover:underline flex items-center">
            <i className="fa-solid fa-location-pin mr-2"></i>16/1 Rohini Delhi-112642
          </a>
          <a href="#" className="hover:underline">abcd@gmail.com</a>
          <a href="#" className="hover:underline">+91 9958634750</a>
        </div>
      </div>
      <div className="flex gap-4 text-2xl">
        <i className="fa-brands fa-square-facebook cursor-pointer hover:translate-y-[-5px] transition-transform"></i>
        <i className="fa-brands fa-square-twitter cursor-pointer hover:translate-y-[-5px] transition-transform"></i>
        <i className="fa-brands fa-square-instagram cursor-pointer hover:translate-y-[-5px] transition-transform"></i>
      </div>
      <p>E-commerce Pvt. Ltd © 2012 - 2024. All Rights Reserved.</p>
    </footer>
  );
}