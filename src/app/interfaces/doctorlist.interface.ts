
export interface IDoctor {
    name:       string;
    usuario:    IUsuario;
    img?:    string;
    hospitales?: IHopitalReduce[];
    id:         string;
}



export interface IUsuario {
    _id:   string;
    name:  string;
    email?: string;
    img?:   string;
}

export interface IHopitalReduce {
    _id:     string;
    name:    string;
}