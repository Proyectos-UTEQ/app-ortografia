//Interfaz con el body necesario para actualizar la información de un usuario
export interface UpdateUserProfileI {
    first_name: string;
    last_name: string;
    birth_date: string;
    whatsapp: string;
    telegram: string;
    url_avatar: string;
}