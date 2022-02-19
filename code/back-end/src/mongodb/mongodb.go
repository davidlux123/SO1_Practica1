package mongodb

import (
	"context"
	"fmt"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func GetCollection(ctx context.Context, collection string) *mongo.Collection {
	userName, _ := os.LookupEnv("MONGO_USERNAME")
	pass, _ := os.LookupEnv("MONGO_PASSWORD")
	host, _ := os.LookupEnv("MONGO_HOST")
	if userName == "" || pass == "" || host == "" {
		panic("Error: No se pudo conectar con mongodb, credeciales invalidas en el entorno")
	}

	var err error
	URI := "mongodb://" + userName + ":" + pass + "@" + host + ":27017/SOpractica1?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false"
	client, err = mongo.Connect(ctx, options.Client().ApplyURI(URI))
	if err != nil {
		fmt.Println(" \n Error: no se pudo conectar la db")
		panic(err)
	}
	return client.Database("SOpractica1").Collection(collection)
}

func DisconnectMongoCLient(ctx context.Context) {
	if err := client.Disconnect(ctx); err != nil {
		fmt.Println(" \n Error: no se pudo desconectar la db")
		//panic(err)
	}
}
