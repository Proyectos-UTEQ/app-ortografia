import { CreatedByI } from "../../student/interfaces/modules"

//Interfaz de respuesta de la API al obtener todo el listado de módulos desde el perfil profesor
export interface ApiResponseAllModulesIT {
    data: [
        DataAllodulesIT
    ],
    details: {
        page: number;
        total_page: number;
        total_items: number;
        items_per_page: number;
    }
}

export interface DataAllodulesIT {
    id: number
    created_at: string
    updated_at: string
    create_by: CreatedByI
    code: string
    title: string
    short_description: string
    text_root: string
    img_back_url: string
    difficulty: string
    points_to_earn: number
    index: number
    is_public: boolean
}
