package main

// server is used to implement helloworld.GreeterServer.
import (
	"log"
	"net"

	pb "github.com/nii236/todo/protos"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

type addTodoServer struct{}
type listTodoServer struct{}

var port = "localhost:8888"

// AddTodoService implements pb.AddTodoServer
func (s addTodoServer) AddTodoService(ctx context.Context, in *pb.AddTodoRequest) (*pb.AddTodoResponse, error) {
	return &pb.AddTodoResponse{Response: "Hello"}, nil
}

func (s listTodoServer) ListTodoService(ctx context.Context, in *pb.EmptyMessage) (*pb.AllTodos, error) {
	res := make([]string, 3)

	return &pb.AllTodos{Todos: res}, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterAddTodoServer(s, &addTodoServer{})
	pb.RegisterListTodoServer(s, &listTodoServer{})
	s.Serve(lis)
}
