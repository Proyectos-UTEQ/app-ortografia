import { CreatedByI } from "../../student/interfaces/modules";

//Interfaz de respuesta de la API para obtener el listado de actividades según el ID del módulo
export interface ApiResponseListActivitiesIT{
    data: [
        DetailActivityByModuleIT
    ],
    details: {
        page: number;
        total_page: number;
        total_items: number;
        items_per_page: number;
    }
}

//Interfaz con el detalle de la actividad que se muestra en el array de la interfaz anterior
export interface DetailActivityByModuleIT{
    id: number;
    type_question: string;
    created_by: CreatedByI;
    created_at: string;
    updated_at: string;
    difficulty: string;
}