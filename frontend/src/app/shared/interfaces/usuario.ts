export interface usuario {

    // username: string;
    password: string;
    password2: string;
    email: string;
    first_name: string;
    last_name: string;
    telefono: string;
    token?: string;
    direccion: {
        calle: string;
        numero: string;
        // barrio: {
        //     nombre_barrio: string;
        //     localidad: {
        //         nombre_localidad: string;
        //         cod_postal: any;
        //     };
        // };
    };

}
