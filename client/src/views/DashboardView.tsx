import { getProjects } from "@/api/ProjectAPI";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function DashboardView() {

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })

  if (isLoading) return 'Cargando...'

  if (data) return (
    <>
      <h1 className="text-5xl font-black">Mis Proyectos</h1>
      <p className="text-2xl font-light">Maneja y administra tus proyectos</p>
      <nav className="my-5">
        <Link
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          to="/projects/create"
        >
          Nuevo Proyecto
        </Link>
      </nav>
      {data.length ? (
        <p>Si hay proyectos</p>
      ) : (
        <p className="text-center py-20"> No hay proyectos aún
          <Link
            to="/projects/create"
            className="text-fuchsia-500 font-bold"
          >Crear Proyecto</Link>
        </p>
      )}
    </>
  )
}
