'use client'
import { useState, useEffect } from "react";
import { Input, Button, Flex, List, ListItem, ListIcon, OrderedList, UnorderedList, Alert, AlertIcon, Heading, Text, Card } from '@chakra-ui/react'
import { SmallAddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'

export default function Home() {

  const [allTasks, setAllTasks] = useState([])
  const [task, setTask] = useState("")
  const [editTask, setEditTask] = useState("")

  const handleCreateTask = async() => {
    try {
      const response = await fetch("/api/task/new", {
        method: "POST",
        body: JSON.stringify({
          task: task,
        }),
      });
      if(response.ok) {
        await fetchTasks()
        setTask('')
      }
      else {
        console.log('error')
      }
    }
    catch(error) {
      console.log(error)
    } 
  }

  const handleDeleteTask = async(id) => {
    try {
      const response = await fetch(`/api/task/delete/${id.toString()}`, {
        method: "DELETE"
      });
      if(response.ok) {
        setAllTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      }
      else {
        console.log('error')
      }
    }
    catch(error) {
      console.log(error)
    }
  }

  const handleEditTask = (id, content) => {
    setEditTask(content);
  };

  const handleUpdateTask = async (id) => {
    try {
      const response = await fetch(`/api/task/edit/${id.toString()}`, {
        method: "PATCH",
        body: JSON.stringify({
          task: editTask,
        }),
      })
      if (response.ok) {
        await fetchTasks()
      } else {
        console.log("Error editing task.")
      }
    } catch (error) {
      console.log("Error editing task:", error)
    } finally {
      setEditTask("")
    }
  }

  const fetchTasks = async() => {
    try {
      const response = await fetch("/api/task/all");
      const data = await response.json();
      setAllTasks(data);
    }
    catch (error) {
      console.log("Error fetching tasks:", error);
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <>
      <Flex p="2rem" direction="column" alignItems="center">
        <Heading as='h1' size='4xl' noOfLines={1} className="tasklist-title">
          TaskList.io
        </Heading>
        <Text mt="1rem" className="tasklist-slogan">
          TaskList est un outil open-source qui vous simplifie votre quotidien en toute efficacité.
        </Text>
      </Flex>
      <Flex pt="2rem" pl="2rem" pr="2rem" pb="1rem">
        <Input 
          placeholder='Nouvelle tâche...' 
          size='lg' 
          onChange={(e) => setTask(e.target.value)} 
          value={task}
          style={{ 'background': '#fff' }}
        />
        <Button 
          colorScheme='twitter' 
          size='lg'
          onClick={() => handleCreateTask()}
        >
          <SmallAddIcon />
        </Button>
      </Flex>
      
      <Flex direction="column" p="2rem">
        {allTasks.length > 0 ? (
          allTasks.map((individualTask) => (
              <Card p="2rem" mb="0.5rem" variant='outline'>
              {editTask && individualTask._id === editTask._id ? (
                <Flex>
                  <Input
                    value={editTask.task}
                    onChange={(e) =>
                      setEditTask({ ...editTask, task: e.target.value })
                    }
                    placeholder='large size' 
                    size='lg' 
                  />
                  <Button
                    colorScheme='yellow'
                    size='lg'
                    onClick={() => handleUpdateTask(editTask._id)}
                  >
                    Modifier
                  </Button>
                </Flex>
              ) : (
                <>
                  <Flex alignItems="center">
                    <Text flexGrow="1">{individualTask.task}</Text>
                    <Flex>
                      <Button 
                        ml="1rem"
                        colorScheme="yellow"
                        onClick={() => handleEditTask(individualTask._id, individualTask)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        ml="1rem"
                        colorScheme='red'
                        onClick={() => handleDeleteTask(individualTask._id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Flex>
                  </Flex>
                </>
              )}
              </Card>
          ))
        ) : (
          <Flex>
            <Alert status='warning'>
              <AlertIcon />
              Pas de tâche pour le moment
            </Alert>
          </Flex>
        )}
      </Flex>
    </>
  )
}
