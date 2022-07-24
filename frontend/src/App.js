// 3rd party
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const App = () => {
  return (
    <div>
        <Calendar minDate={new Date()} />
    </div>
  );
}

export default App;
