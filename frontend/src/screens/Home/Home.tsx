import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";

export default function Home() {

    return (
        <section className="w-[600px] h-[150px] bg-slate-300 m-auto">
            <h2 className="text-[2rem] text-green-700 text-center">Home</h2>
            <Header/> 
            <Main/>
            <Footer/>
        </section>
    )
}