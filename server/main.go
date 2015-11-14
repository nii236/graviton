package main

// server is used to implement helloworld.GreeterServer.
import (
	"fmt"
	"log"
	"net"
	"os"

	pb "github.com/nii236/graviton/protos"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

type addTodoServer struct{}
type listTodoServer struct{}

// AddTodoService implements pb.AddTodoServer
func (s addTodoServer) AddTodo(ctx context.Context, in *pb.AddTodoRequest) (*pb.AddTodoResponse, error) {
	fmt.Println("AddTodoRequest received, " + in.Todo)
	return &pb.AddTodoResponse{Response: "Added todo item " + in.Todo}, nil
}

func main() {
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
	pb.RegisterTodoServer(s, &addTodoServer{})
	s.Serve(lis)
}
