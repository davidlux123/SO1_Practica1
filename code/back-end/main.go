package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/mongodb-developer/docker-golang/src/controllers"
)

func main() {

	// Crear el enrutador y definir las rutas en la función definirRutas
	router := mux.NewRouter()
	headers := handlers.AllowedHeaders([]string{"X-Request-Headers", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"*"})

	port := ":8000"
	router.HandleFunc("/logs", controllers.Getlogs).Methods("GET")
	router.HandleFunc("/calcu", controllers.Createlog).Methods("POST")

	fmt.Println("Escuchando en el puerto " + port + ", Presiona CTRL + C para salir...")
	log.Fatal(http.ListenAndServe(port, handlers.CORS(headers, methods, origins)(router)))
}
