import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar, FlatList, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(
      response => {
        console.log(response.data)
        setProjects(response.data)
      }
    );
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: 'Adicionado pelo botão',
      owner: 'Douglinhas'
    })

    const project = response.data;

    setProjects([...projects, project])
  }

  return (
    <>
      <StatusBar backgroundColor="purple" barStyle="dark-content"/>

      <SafeAreaView 
        style={styles.container}
      >
        <FlatList 
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.title}>{project.title}</Text>
          )}
        />

        <Button
          title={'Me Aperta'}
          onPress={handleAddProject}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>{'Adicionar projeto'}</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#fff',
    height: 50,
    margin: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16
  }
})
