package main

import "fmt"

type todoItem struct {
	id   int
	desc string
}

var todos []todoItem

func main() {
	fmt.Println("Starting todo")

	for i := 0; i < 5; i++ {
		add()
	}
	fmt.Println(todos)

}

func add() {
	newTodo := todoItem{
		id:   1,
		desc: "Something",
	}

	todos = append(todos, newTodo)
}
