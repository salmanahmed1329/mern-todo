import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet, StatusBar, Modal, TouchableWithoutFeedback, Keyboard, ActivityIndicator, FlatList } from 'react-native';

import { useIsKeyboardFocused } from '../hooks';
import { TextInputView } from '../components';
import { GLOBAL_STYLE, STYLE_STRING } from '../styles';

////////////////////////////////////////////////////////////////////////////////////////////////////

type Todo = 
{
  _id: string;
  task: string;
  isFinished: boolean;
  timestamp: Date;
  __v: string;
};

const ToDoView = () => 
{
  //////////////////////////////////////////////////
  //#region - variables

  const [shouldRender, setShouldRender] = useState(false);
  const [showModal_NewTodo, setShowModal_NewTodo] = useState(false);

  const [todosList, setTodosList] = useState<Todo[]>([]);

  const BASE_URL = 'http://10.0.2.2:5001'; // localhost
  // const BASE_URL = ''; // ngrok

  //#endregion

  //////////////////////////////////////////////////
  //#region - functions

  useEffect(() => 
  {
    setTimeout(() => 
      FetchTodosList(), 700
    );

  }, []);

  async function FetchTodosList()
  {
    const options: RequestInit = 
    {
      method: 'GET',
      headers: 
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    await fetch(`${BASE_URL}/todos`, options)
    .then(response => 
      response.json()
    )
    .then((data: Todo[]) => 
      setTodosList(data)
    )
    .catch(exception => 
      console.log(`exception = ${JSON.stringify(exception)}`)
    )
    .finally(() => 
      setShouldRender(true)
    );
  }

  async function ToggleTodo(id: string)
  {
    const options: RequestInit = 
    {
      method: 'GET',
      headers: 
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    await fetch(`${BASE_URL}/todo/toggle/${id}`, options)
    .then(response => 
      response.json()
    )
    .then((data: Todo) => 
    {
      setTodosList(todos => 
        todos?.map(todoItem => 
          todoItem._id == data?._id ? { ...todoItem, isFinished: data?.isFinished } : todoItem
        )
      );
    })
    .catch(exception => 
      console.log(`exception = ${JSON.stringify(exception)}`)
    )
    .finally(() => 
      setShouldRender(true)
    );
  }

  async function DeleteTodo(id: string)
  {
    const options: RequestInit = 
    {
      method: 'DELETE',
      headers: 
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    await fetch(`${BASE_URL}/todo/${id}`, options)
    .then(response => 
      response.json()
    )
    .then((data: Todo) => 
    {
      setTodosList(todos => 
        todos?.filter(todoItem => 
          todoItem._id != data?._id
        )
      );
    })
    .catch(exception => 
      console.log(`exception = ${JSON.stringify(exception)}`)
    )
    .finally(() => 
      setShouldRender(true)
    );
  }

  async function OnAddTodo(task: string)
  {
    if (task)
      await AddTodo(task?.trim());

    else
      Alert.alert("Error", "Task is required...");
  }

  async function AddTodo(task: string)
  {
    const options: RequestInit = 
    {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ task }),
    };

    await fetch(`${BASE_URL}/todo`, options)
    .then(response => 
      response.json()
    )
    .then((data: Todo) => 
    {
      setTodosList(todos => todos.concat(data));

      setShowModal_NewTodo(false);
    })
    .catch(exception => 
      console.log(`exception = ${JSON.stringify(exception)}`)
    )
    .finally(() => 
      setShouldRender(true)
    );
  }

  //#endregion

  //////////////////////////////////////////////////
  //#region - render

  return(
    <View style={localStyleSheet.todo_container}>

      {
        showModal_NewTodo 
        && 
        <ModalNewTodoView
          OnTaskAdd={text => OnAddTodo(text)}
          OnCloseModal={() => setShowModal_NewTodo(false)}
        />
      }

      <StatusBar
        backgroundColor={STYLE_STRING.COLOR.DARK}
      />

      <Text style={localStyleSheet.todo_greeting}>
        {"Welcome, SalmanAhmed1329"}
      </Text>
      <Text style={localStyleSheet.todo_heading}>
        {"Your Tasks"}
      </Text>

      {
        shouldRender
        ?
        <>
          {
            <FlatList
              data={todosList}
              keyExtractor={(item, _) => item?._id}

              showsVerticalScrollIndicator={false}

              ListEmptyComponent={() => 
                <Text style={localStyleSheet.todo_emptyList}>
                  {"No tasks to show..."}
                </Text>
              }

              renderItem={({ item, index }) => 
                <TodoItemView
                  key={item._id}
                  todo={item}
                  OnToggle={() => ToggleTodo(item._id)}
                  OnDelete={() => DeleteTodo(item._id)}
                />
              }
            />
          }

          <Text 
            style={[localStyleSheet.addTodo_button, localStyleSheet.addTodo_text]}
            onPress={() => setShowModal_NewTodo(true)}
          >
            {"+"}
          </Text>
        </>
        :
        <ActivityIndicator
          style={{ flex: 1, }}
          color={STYLE_STRING.COLOR.LIGHT}
          size={STYLE_STRING.ICON_SIZE._45}
        />
      }
      
    </View>
  );

  //#endregion

  //////////////////////////////////////////////////
};

////////////////////////////////////////////////////////////////////////////////////////////////////

type TodoItemViewType = 
{
  todo: Todo;
  OnToggle: () => void;
  OnDelete: () => void;
};

const TodoItemView = (props: TodoItemViewType) => 
{
  //////////////////////////////////////////////////
  //#region - variables

  const todo = props.todo;

  //#endregion

  //////////////////////////////////////////////////
  //#region - functions

  //#endregion

  //////////////////////////////////////////////////
  //#region - render

  return(
    <TouchableOpacity
      style={localStyleSheet.todoItem_container}
      activeOpacity={STYLE_STRING.OPACTIY._65}
      onPress={() => props.OnToggle()}
    >
      <Text
        style=
        {[
          localStyleSheet.todoItem_status, 
          { backgroundColor: todo?.isFinished ? STYLE_STRING.COLOR.SECONDARY : STYLE_STRING.COLOR.DARK_ALT, }
        ]}
      >
        {" "}
      </Text>
      <Text
        style={[localStyleSheet.todoItem_task, todo?.isFinished && { textDecorationLine: 'line-through', }]}
      >
        {todo.task}
      </Text>
      <Text
        style={localStyleSheet.todoItem_deleteTodo}
        onPress={() => props.OnDelete()}
      >
        {"X"}
      </Text>
    </TouchableOpacity>
  );

  //#endregion

  //////////////////////////////////////////////////
};

////////////////////////////////////////////////////////////////////////////////////////////////////

type ModalNewTodoViewType = 
{
  OnTaskAdd: (text: string) => void;
  OnCloseModal: () => void;
};

const ModalNewTodoView = (props: ModalNewTodoViewType) => 
{
  //////////////////////////////////////////////////
  //#region - variables

  const isKeyboardFocused = useIsKeyboardFocused();

  const [task, setTask] = useState('');

  //#endregion

  //////////////////////////////////////////////////
  //#region - functions
  
  function CheckKeyboardAndCloseModal() 
  {
    isKeyboardFocused 
    ? Keyboard.dismiss()
    : props.OnCloseModal();
  }

  //#endregion

  //////////////////////////////////////////////////
  //#region - render
  
  return(
    <Modal
      transparent
      animationType={'none'}
      onRequestClose={() => CheckKeyboardAndCloseModal()}
    >
      <StatusBar backgroundColor={STYLE_STRING.COLOR.DARK} />

      <TouchableWithoutFeedback onPress={() => CheckKeyboardAndCloseModal()}>
        <View style={GLOBAL_STYLE.modal_container}>

          <TouchableWithoutFeedback>
            <View style={[localStyleSheet.modal_subContainer, { padding: '4%', backgroundColor: STYLE_STRING.COLOR.DARK_ALT, }]}>

              <View style={{ flexDirection: 'row', }}>
                <Text style={{ flex: 1, color: STYLE_STRING.COLOR.LIGHT, fontSize: STYLE_STRING.FONT_SIZE._18, fontFamily: STYLE_STRING.FONT_FAMILY.Comfortaa.Font_Medium, textAlignVertical: 'center', }}>
                  {"Add Task"}
                </Text>
                <Text 
                  style={localStyleSheet.todoItem_deleteTodo}
                  onPress={() => props.OnCloseModal()}
                >
                  {"X"}
                </Text>
              </View>

              <TextInputView
                containerStyle={{ marginVertical: '8%', }}
                textboxStyle={{ borderRadius: 999, }}
                textStyle={{ fontSize: STYLE_STRING.FONT_SIZE._16, marginLeft: '2%', }}
                placeholder={"Please enter Task"}
                text={task}
                OnTextChange={text => setTask(text)}
              />

              <TouchableOpacity
                style={{}}
                activeOpacity={STYLE_STRING.OPACTIY._65}
                onPress={() => props.OnTaskAdd(task)}
              >
                <Text style={{ ...localStyleSheet.createTodo_text, alignSelf: 'flex-end', }}>
                  {"Create Task"}
                </Text>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>

        </View>
      </TouchableWithoutFeedback>

    </Modal>
  );

  //#endregion

  //////////////////////////////////////////////////
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const localStyleSheet = StyleSheet.create
({
  todo_container:
  {
    flex: 1, backgroundColor: STYLE_STRING.COLOR.DARK, 
    paddingHorizontal: '4%', paddingVertical: '4%', 
  },

  todo_greeting:
  {
    color: STYLE_STRING.COLOR.LIGHT, 
    fontSize: STYLE_STRING.FONT_SIZE._24, fontFamily: STYLE_STRING.FONT_FAMILY.Comfortaa.Font_SemiBold, 
    textAlignVertical: 'center', 
    marginBottom: '4%', 
  },

  todo_heading:
  {
    color: STYLE_STRING.COLOR.LIGHT, 
    fontSize: STYLE_STRING.FONT_SIZE._20, fontFamily: STYLE_STRING.FONT_FAMILY.Comfortaa.Font_Medium, 
    textAlignVertical: 'center', 
    marginBottom: '2%', 
  },

  addTodo_button:
  {
    position: 'absolute', bottom: '2.5%', right: '6%', width: 64, height: 64, 
    justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', 
    backgroundColor: STYLE_STRING.COLOR.SECONDARY, borderRadius: 999, 
  },

  addTodo_text:
  {
    color: STYLE_STRING.COLOR.LIGHT, 
    fontSize: STYLE_STRING.FONT_SIZE._22, 
    textAlign: 'center', textAlignVertical: 'center', 
  },

  createTodo_text: 
  {
    color: STYLE_STRING.COLOR.LIGHT, backgroundColor: STYLE_STRING.COLOR.SECONDARY, borderRadius: 999, 
    fontSize: STYLE_STRING.FONT_SIZE._16, 
    textAlign: 'center', textAlignVertical: 'center', 
    paddingVertical: '3%', paddingHorizontal: '4%', 
  },

  todo_emptyList: 
  {
    height: STYLE_STRING.DIMENSION.VISIBLE_HEIGHT *0.8, color: STYLE_STRING.COLOR.LIGHT, 
    fontSize: STYLE_STRING.FONT_SIZE._18, fontFamily: STYLE_STRING.FONT_FAMILY.Comfortaa.Font_Medium, 
    textAlign: 'center', textAlignVertical: 'center', 
  },

  //////////////////////////////////////////////////

  todoItem_container:
  {
    flexDirection: 'row', alignItems: 'center', backgroundColor: STYLE_STRING.COLOR.DARK_ALT, 
    borderRadius: STYLE_STRING.DIMENSION.VISIBLE_WIDTH *0.05, borderWidth: 1, borderColor: STYLE_STRING.COLOR.DARK_ALT, 
    paddingHorizontal: '4%', paddingVertical: '3%', marginVertical: '2%', 
  },

  todoItem_status:
  {
    borderWidth: 1, borderRadius: 999, 
    fontSize: STYLE_STRING.FONT_SIZE._16, fontFamily: STYLE_STRING.FONT_FAMILY.Comfortaa.Font_Regular, 
    textAlign: 'center', textAlignVertical: 'center', 
    paddingHorizontal: '2.5%', 
  },

  todoItem_task:
  {
    flex: 1, color: STYLE_STRING.COLOR.LIGHT, 
    fontSize: STYLE_STRING.FONT_SIZE._16, fontFamily: STYLE_STRING.FONT_FAMILY.Comfortaa.Font_Regular, 
    textAlignVertical: 'center', 
    paddingVertical: '1%', marginLeft: '4%', 
  },

  todoItem_deleteTodo:
  {
    color: STYLE_STRING.COLOR.LIGHT, backgroundColor: STYLE_STRING.COLOR.PRIMARY, borderRadius: 999, 
    fontSize: STYLE_STRING.FONT_SIZE._16, fontFamily: STYLE_STRING.FONT_FAMILY.Comfortaa.Font_Regular, 
    textAlign: 'center', textAlignVertical: 'center', 
    paddingHorizontal: '3%', paddingVertical: '1%', 
  },

  //////////////////////////////////////////////////

  modal_subContainer: 
  {
    ...GLOBAL_STYLE.modal_subContainer, width: '80%',  
  },
});

////////////////////////////////////////////////////////////////////////////////////////////////////

export default ToDoView;
