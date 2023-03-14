import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  deleteTodo,
  putTodo,
  showTutorial,
  changeShowTitle,
  changeStep,
} from '../store/slice';
import { MyTooltip } from '../components/Tooltip';
import { useState } from 'react';

export const Todo = () => {
  const { todo, show, showTitle, step } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [state, setState] = useState(false);

  const onSubmit = (values) => {
    dispatch(putTodo(values));
    if (state) {
      dispatch(showTutorial(true));
      dispatch(changeStep(2));
    }
  };
  const removeTodo = (id) => {
    dispatch(deleteTodo(id));

    dispatch(showTutorial(false));
    dispatch(changeStep(1));

    setState(false);
  };

  const startTutorial = () => {
    dispatch(showTutorial(true));
    dispatch(changeShowTitle(false));
    setState(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Formik
        initialValues={{ text: '' }}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
        }}
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <View style={{ height: '50%' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {show && step === 1 ? (
                  <MyTooltip
                    tooltipText="Type your first todo and click button"
                    visible={show}
                    placement="bottom"
                  >
                    <TextInput
                      style={[
                        styles.input,
                        {
                          borderColor: show ? '#62D7C5' : 'black',
                          borderWidth: show ? 3 : 1,
                          backgroundColor: 'rgba(255, 255, 255, 1)',
                        },
                      ]}
                      onFocus={() => {
                        dispatch(showTutorial(false));
                      }}
                      onChangeText={handleChange('text')}
                      value={values.text}
                    />
                  </MyTooltip>
                ) : (
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('text')}
                    value={values.text}
                  />
                )}
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    borderWidth: 1,
                    padding: 10,
                    borderColor: 'black',
                  }}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
              {showTitle && (
                <TouchableOpacity
                  onPress={startTutorial}
                  style={{ marginTop: 24 }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 24,
                      fontWeight: '500',
                    }}
                  >
                    Show tutorial
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      </Formik>
      <View style={{ marginLeft: 12, marginRight: 12 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 700,
            marginTop: 12,
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          Todos
        </Text>
        <FlatList
          data={todo}
          renderItem={({ item }) => {
            return (
              <View
                key={item.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  padding: 10,
                  marginBottom: 4,
                }}
              >
                <Text style={{ fontSize: 18, marginRight: 10 }}>
                  {item.text}
                </Text>
                {show &&
                step === 2 &&
                item.text === todo[todo.length - 1]?.text ? (
                  <MyTooltip
                    tooltipText="If you want you can remove todo"
                    visible={show}
                    placement="top"
                  >
                    <TouchableOpacity
                      onPress={() => removeTodo(item.id)}
                      style={{
                        padding: 8,
                        borderColor: show ? '#62D7C5' : 'black',
                        borderWidth: show ? 3 : 1,
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                      }}
                    >
                      <Text>-</Text>
                    </TouchableOpacity>
                  </MyTooltip>
                ) : (
                  <TouchableOpacity
                    onPress={() => removeTodo(item.id)}
                    style={{
                      padding: 8,
                      borderColor: 'black',
                      borderWidth: 1,
                    }}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 320,
  },
});
