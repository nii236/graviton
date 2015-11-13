package main

// server is used to implement helloworld.GreeterServer.
import (
	"fmt"
	"log"
	"net"

	pb "github.com/nii236/graviton/protos"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

type addTodoServer struct{}
type listTodoServer struct{}

var port = "localhost:8888"

// AddTodoService implements pb.AddTodoServer
func (s addTodoServer) AddTodo(ctx context.Context, in *pb.AddTodoRequest) (*pb.AddTodoResponse, error) {
	fmt.Println("AddTodoRequest received")
	return &pb.AddTodoResponse{Response: "Hello"}, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterTodoServer(s, &addTodoServer{})
	s.Serve(lis)
}
