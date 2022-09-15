import { useState , useEffect} from 'react';
import "./style.css";

import { Card } from '../../components/Card';

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''});

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
    setStudents(beforeState =>[...beforeState, newStudent]);
  }

  useEffect(() => {
    fetch('https://api.github.com/users/mateusribeiros')
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        })
      })
  },[]);

  return (
    <div className="container">
      <header>
          <h1>Promoter</h1>
          
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Github picture profile"/>
        </div>
      </header>

      <input 
        type="text" 
        placeholder="Digite aqui..."
        onChange={e => setStudentName(e.target.value)}
        />

      <button type="submit" onClick={handleAddStudent}>
        Enviar
      </button>

      {
        students.map(student => (
          <Card
            key={student.time}
            name={student.name} 
            time={student.time}
          />
        ))
      }

    </div>
  );
}
