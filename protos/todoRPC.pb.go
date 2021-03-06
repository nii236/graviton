// Code generated by protoc-gen-go.
// source: todoRPC.proto
// DO NOT EDIT!

/*
Package todo is a generated protocol buffer package.

It is generated from these files:
	todoRPC.proto

It has these top-level messages:
	AddTodoRequest
	AddTodoResponse
	TodoItem
	TodoList
	ListTodoRequest
	ListTodoResponse
*/
package todo

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

import (
	context "golang.org/x/net/context"
	grpc "google.golang.org/grpc"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

type AddTodoRequest struct {
	Todo string `protobuf:"bytes,1,opt,name=todo" json:"todo,omitempty"`
}

func (m *AddTodoRequest) Reset()         { *m = AddTodoRequest{} }
func (m *AddTodoRequest) String() string { return proto.CompactTextString(m) }
func (*AddTodoRequest) ProtoMessage()    {}

type AddTodoResponse struct {
	Response string `protobuf:"bytes,1,opt,name=response" json:"response,omitempty"`
}

func (m *AddTodoResponse) Reset()         { *m = AddTodoResponse{} }
func (m *AddTodoResponse) String() string { return proto.CompactTextString(m) }
func (*AddTodoResponse) ProtoMessage()    {}

type TodoItem struct {
	Item string `protobuf:"bytes,1,opt,name=item" json:"item,omitempty"`
}

func (m *TodoItem) Reset()         { *m = TodoItem{} }
func (m *TodoItem) String() string { return proto.CompactTextString(m) }
func (*TodoItem) ProtoMessage()    {}

type TodoList struct {
	TodoItems []*TodoItem `protobuf:"bytes,1,rep,name=TodoItems" json:"TodoItems,omitempty"`
}

func (m *TodoList) Reset()         { *m = TodoList{} }
func (m *TodoList) String() string { return proto.CompactTextString(m) }
func (*TodoList) ProtoMessage()    {}

func (m *TodoList) GetTodoItems() []*TodoItem {
	if m != nil {
		return m.TodoItems
	}
	return nil
}

type ListTodoRequest struct {
	Request string `protobuf:"bytes,1,opt,name=request" json:"request,omitempty"`
}

func (m *ListTodoRequest) Reset()         { *m = ListTodoRequest{} }
func (m *ListTodoRequest) String() string { return proto.CompactTextString(m) }
func (*ListTodoRequest) ProtoMessage()    {}

type ListTodoResponse struct {
	TodoItems *TodoList `protobuf:"bytes,1,opt,name=TodoItems" json:"TodoItems,omitempty"`
}

func (m *ListTodoResponse) Reset()         { *m = ListTodoResponse{} }
func (m *ListTodoResponse) String() string { return proto.CompactTextString(m) }
func (*ListTodoResponse) ProtoMessage()    {}

func (m *ListTodoResponse) GetTodoItems() *TodoList {
	if m != nil {
		return m.TodoItems
	}
	return nil
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// Client API for Todo service

type TodoClient interface {
	AddTodo(ctx context.Context, in *AddTodoRequest, opts ...grpc.CallOption) (*AddTodoResponse, error)
	ListTodo(ctx context.Context, in *ListTodoRequest, opts ...grpc.CallOption) (*ListTodoResponse, error)
}

type todoClient struct {
	cc *grpc.ClientConn
}

func NewTodoClient(cc *grpc.ClientConn) TodoClient {
	return &todoClient{cc}
}

func (c *todoClient) AddTodo(ctx context.Context, in *AddTodoRequest, opts ...grpc.CallOption) (*AddTodoResponse, error) {
	out := new(AddTodoResponse)
	err := grpc.Invoke(ctx, "/todo.Todo/AddTodo", in, out, c.cc, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *todoClient) ListTodo(ctx context.Context, in *ListTodoRequest, opts ...grpc.CallOption) (*ListTodoResponse, error) {
	out := new(ListTodoResponse)
	err := grpc.Invoke(ctx, "/todo.Todo/ListTodo", in, out, c.cc, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// Server API for Todo service

type TodoServer interface {
	AddTodo(context.Context, *AddTodoRequest) (*AddTodoResponse, error)
	ListTodo(context.Context, *ListTodoRequest) (*ListTodoResponse, error)
}

func RegisterTodoServer(s *grpc.Server, srv TodoServer) {
	s.RegisterService(&_Todo_serviceDesc, srv)
}

func _Todo_AddTodo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error) (interface{}, error) {
	in := new(AddTodoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	out, err := srv.(TodoServer).AddTodo(ctx, in)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func _Todo_ListTodo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error) (interface{}, error) {
	in := new(ListTodoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	out, err := srv.(TodoServer).ListTodo(ctx, in)
	if err != nil {
		return nil, err
	}
	return out, nil
}

var _Todo_serviceDesc = grpc.ServiceDesc{
	ServiceName: "todo.Todo",
	HandlerType: (*TodoServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "AddTodo",
			Handler:    _Todo_AddTodo_Handler,
		},
		{
			MethodName: "ListTodo",
			Handler:    _Todo_ListTodo_Handler,
		},
	},
	Streams: []grpc.StreamDesc{},
}
