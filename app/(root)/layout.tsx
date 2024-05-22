import Header from "@/components/myComponents/header";
import MobileNav from "@/components/myComponents/mobile-nav";


const PageLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="w-full">
            <Header className='h-20'/>
            <MobileNav className=" lg:hidden"/>
            {children}
        </div>
    );
}
 
export default PageLayout;