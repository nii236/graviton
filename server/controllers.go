package main

import (
	"fmt"

	pb "github.com/nii236/graviton/protos"
	"golang.org/x/net/context"
)

// TodoServer contains the collection of methods used in the gRPC Todo
type TodoServer struct{}

var todos pb.TodoList

// AddTodo adds a new TodoItem
func (s TodoServer) AddTodo(ctx context.Context, in *pb.AddTodoRequest) (*pb.AddTodoResponse, error) {
	fmt.Println("AddTodoRequest received, " + in.Todo)
	todo := pb.TodoItem{Item: in.Todo}
	todos.TodoItems = append(todos.TodoItems, &todo)
	fmt.Println("Current todos:", todos)

	return &pb.AddTodoResponse{Response: "Added todo item " + in.Todo}, nil
}

// ListTodo returns a slice of TodoItems
func (s TodoServer) ListTodo(ctx context.Context, in *pb.ListTodoRequest) (*pb.ListTodoResponse, error) {
	fmt.Println("ListTodoRequest received")
	res := &pb.ListTodoResponse{TodoItems: &todos}
	fmt.Println(res)
	return res, nil
}
