import Layout from '../../components/Layout';
import InstitucionManagement from '../../components/otrosMantenimientos/instituciones'; // Asegúrate de que la ruta sea correcta
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';

const SECRET_KEY = process.env.SECRET_KEY || 'tu_clave_secreta';

const DashboardInstituciones = () => {
    useEffect(() => {
        document.title = "Mantenimiento de Instituciones"; // Cambiar el título de la página
    }, []);

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <br />
                <h1 className="text-3xl font-bold mb-4">Instituciones</h1>
                <br /><br />
                <InstitucionManagement /> {/* Componente de gestión de instituciones */}
            </div>
        </Layout>
    );
};

export const getServerSideProps = async (context) => {
    const { req } = context;
    const token = req.cookies.token || '';

    try {
        jwt.verify(token, SECRET_KEY); // Verificar si el token es válido
        return { props: {} }; // Si el token es válido, mostrar la página
    } catch (error) {
        // Si el token no es válido, redirigir al usuario al inicio
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
};

export default DashboardInstituciones;