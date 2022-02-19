package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/mongodb-developer/docker-golang/src/models"
	"github.com/mongodb-developer/docker-golang/src/mongodb"
	"go.mongodb.org/mongo-driver/bson"
)

func operar(v1, v2 int64, op string) int64 {

	if op == "+" {
		return v1 + v2
	} else if op == "-" {
		return v1 - v2
	} else if op == "*" {
		return v1 * v2
	} else { //if op == "/" {
		return v1 / v2
	}
}

func Createlog(respuesta http.ResponseWriter, peticion *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	collection := mongodb.GetCollection(ctx, "logs")
	defer cancel()

	var nuevoLog models.Log
	// Intenta decodificar el cuerpo de la petición (peticion.Body) dentro de models.Log
	if err := json.NewDecoder(peticion.Body).Decode(&nuevoLog); err != nil {
		json.NewEncoder(respuesta).Encode("Error: cuerpo de la peticion de petición no válido")
		//panic(err.Error())
	}

	nuevoLog.Result = operar(nuevoLog.V1, nuevoLog.V2, nuevoLog.Operacion)

	// Si el Log era válido lo agregamos
	if _, err := collection.InsertOne(ctx, nuevoLog); err != nil {
		json.NewEncoder(respuesta).Encode("Error: no se pudo ingresar el registro en la collection")
		panic(err.Error())
	}
	//mongodb.DisconnectMongoCLient(ctx)
	json.NewEncoder(respuesta).Encode(nuevoLog)
}

func Getlogs(respuesta http.ResponseWriter, peticion *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	collection := mongodb.GetCollection(ctx, "logs")
	defer cancel()

	var logs []models.Log
	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		json.NewEncoder(respuesta).Encode("Error: no se encontro la collection 'logs'")
		//panic(err.Error())
	}
	if err = cursor.All(ctx, &logs); err != nil {
		json.NewEncoder(respuesta).Encode("Error: imposible parsear obejct_db -> model.log'")
		//panic(err.Error())
	}

	//mongodb.DisconnectMongoCLient(ctx)
	json.NewEncoder(respuesta).Encode(logs)
}
