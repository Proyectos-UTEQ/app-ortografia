import { CreatedByI, DetailsPage } from "./modules";

//Interfaz con el body necesario para que un estudiante se suscriba a un módulo
export interface SubscribeToModuleI{
    code: string;
}

//Interfaz que muestra la respuesta de la API para cuando un usuario se suscribe a un módulo
export interface ApiResponseSubscribedModulesI {
    status: string;
}



//Interfaz de respuesta de la Api con el array de módulos
export interface ApiResponseSubscribedModulesI {
    data: [
        DataSubscribedModulesStudentI
    ],
    details: DetailsPage;
}

//Interfaz con la data del módulo
export interface DataSubscribedModulesStudentI {
    id: number;
    created_at: string;
    updated_at: string;
    create_by: CreatedByI;
    code: string;
    title: string;
    short_description: string;
    text_root: string;
    img_back_url: string;
    difficulty: string;
    points_to_earn: number;
    index: number;
    is_public: boolean
    is_subscribed: boolean;
}

