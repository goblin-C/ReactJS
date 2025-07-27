import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function ProductHeader({ user }) {
    const navigate = useNavigate();
    
    const handleAddProductClick = () => {
        navigate('/add-product');
    };
    
    return (
        <div className="flex flex-row justify-between items-center pt-8 pb-2 border-b border-b-[#E5E9EB]">
            <h1 className="font-inter font-extrabold text-4xl">Products</h1>
            <div className="flex">
                <button className="flex mr-2 items-center w-[100px] h-[32px] justify-center border border-[#DDE2E4] rounded-[6px] gap-2">
                    <img src="images/filter.svg" alt="filter" className="" />
                    <span className="text-sidebar-menu-text">Filter</span>
                </button>
                <button className="flex mr-[21px] items-center w-[110px] h-[32px] justify-center border border-[#DDE2E4] rounded-[6px] gap-2">
                    <img src="images/export.svg" alt="filter" className="" />
                    <span className="text-sidebar-menu-text">Export</span>
                </button>
                {user && <Button 
                    buttonText="Add Product" 
                    height="32px"
                    width="140px"
                    icon="add.svg" 
                    onClick={handleAddProductClick}
                    type="button"
                    image="true"
                />}
            </div>
        </div>
    );
}