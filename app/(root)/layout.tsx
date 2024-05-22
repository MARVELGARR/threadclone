import Header from "@/components/myComponents/header";


const PageLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="">
            <Header className='h-20'/>
            {children}
        </div>
    );
}
 
export default PageLayout;