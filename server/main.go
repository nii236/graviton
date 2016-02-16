package main

// server is used to implement helloworld.GreeterServer.
import (
	"fmt"
	"log"
	"net"
	"os"

	pb "github.com/nii236/graviton/protos"
	"google.golang.org/grpc"
)

func main() {
	fmt.Println("Starting graviton backend...")
	port := os.Getenv("PORT")
	host := os.Getenv("HOST")

	if len(port) == 0 {
		port = "3000"
	}

	if len(host) == 0 {
		host = "localhost"
	}

	lis, err := net.Listen("tcp", host+":"+port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterTodoServer(s, &TodoServer{})
	s.Serve(lis)
}
