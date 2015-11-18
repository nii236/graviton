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

type TodoServer struct{}

var todos pb.TodoList

// AddTodo implements pb.AddTodoServer
func (s TodoServer) AddTodo(ctx context.Context, in *pb.AddTodoRequest) (*pb.AddTodoResponse, error) {
	fmt.Println("AddTodoRequest received, " + in.Todo)
	todo := pb.TodoItem{Item: in.Todo}
	todos.TodoItems = append(todos.TodoItems, &todo)
	fmt.Println("Current todos:", todos)

	return &pb.AddTodoResponse{Response: "Added todo item " + in.Todo}, nil
}

// ListTodo implements pb.ListTodoServer
func (s TodoServer) ListTodo(ctx context.Context, in *pb.ListTodoRequest) (*pb.ListTodoResponse, error) {
	fmt.Println("ListTodoRequest received")
	return &pb.ListTodoResponse{TodoItems: &todos.TodoItems}, nil
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
	pb.RegisterTodoServer(s, &TodoServer{})
	s.Serve(lis)
}
