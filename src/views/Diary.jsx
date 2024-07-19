// component
import SectionCard from "../components/SectionCard";

const Dashboard = () => {
    return (
        <main className="flex_col">
            <article className="flex_col welcome_texts">
                <h2 className="title">Elige tu sesión</h2>
                <p className="pb-4">
                    Aquí puedes elegir qué sesión quieres ver, así como también
                    acceder a tu seguimiento.
                </p>
            </article>
            <section className="w-100">
                <SectionCard />
            </section>
        </main>
    );
};

export default Dashboard;
