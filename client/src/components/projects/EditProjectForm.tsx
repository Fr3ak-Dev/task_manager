import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { updateProject } from "@/api/ProjectAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type EditProjectFormProps = {
    data: ProjectFormData
    projectId: Project['_id']
}

export default function EditProjectForm({ data, projectId }: EditProjectFormProps) {

    const navigate = useNavigate()

    /**
     * useForm is a hook from react-hook-form for form management. 
     * It accepts defaultValues for input initialization and returns an object with:
     * - register: function to register inputs.
     * - handleSubmit: function to handle form submission.
     * - formState: includes form errors.
     */
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            projectName: data.projectName,
            clientName: data.clientName,
            description: data.description,
        }
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => { toast.error(error.message) },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Editar Proyecto</h1>
                <p className="text-2xl font-light">Llene el siguiente formulario para editar un proyecto</p>
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
                        value="Guardar Cambios"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}
