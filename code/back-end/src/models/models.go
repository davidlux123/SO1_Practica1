package models

//User datos del usuario
type Log struct {
	V1        int64  `json:"V1"`
	V2        int64  `json:"V2"`
	Operacion string `json:"Operacion"`
	Result    int64  `json:"Result"`
	Fecha     string `json:"Fecha"`
}

//Users lista de usuarios
type Logs []*Log
