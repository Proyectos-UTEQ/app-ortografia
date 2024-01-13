//Interfaz de respuesta de la Api con el array de módulos
export interface ApiResponseModulesStudentI {
    data: [
        DataModulesStudentI
    ],
    details: {
        page: number;
        total_page: number;
        total_items: number;
        items_per_page: number;
    }
}

//Método que contiene la información detallada de un módulo
export interface DataModulesStudentI {
    id: number;
    created_at: string;
    updated_at: string;
    create_by: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        birth_date: string;
        points_earned: number;
        whatsapp: string;
        telegram: string;
        telegram_id: number;
        url_avatar: string;
        status: string;
        type_user: string;
        perfil_update_required: boolean
    },
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
