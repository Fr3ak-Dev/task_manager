import ProjectForm from "@/components/projects/ProjectForm"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectAPI"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"

export default function CreateProjectView() {

    const navigate = useNavigate()
    const initialValues : ProjectFormData = {
        projectName: '',
        clientName: '',
        description: '',
    }
    /**
     * useForm is a hook from react-hook-form for form management. 
     * It accepts defaultValues for input initialization and returns an object with:
     * - register: function to register inputs.
     * - handleSubmit: function to handle form submission.
     * - formState: includes form errors.
     */
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const {mutate} = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData : ProjectFormData) => mutate(formData)

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Crear Proyecto</h1>
                <p className="text-2xl font-light">Llena el siguiente formulario para crear un proyecto</p>
                <nav className="my-5">
                    <Link
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        to="/"
                    >
                        Volver a Proyectos
                    </Link>
                </nav>
                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate // Prevents default HTML5 validation to allow react-hook-form to handle it
                >
                    <ProjectForm 
                        register={register}
                        errors={errors}
                    />
                    <input
                        type="submit"
                        value="Crear Proyecto"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}
