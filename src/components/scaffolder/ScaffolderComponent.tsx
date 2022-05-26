import { useContext } from 'react';
import AppContext from '../../context/AppContext/AppContext';
import AngularScaffolderComponent from '../angular-scaffolder/AngularScaffolderComponent';
import ReactScaffolderComponent from '../react-scaffolder/ReactScaffolderComponent';
import './ScaffolderComponent.css';

const ScaffolderComponent = () => {

  const appContext = useContext(AppContext);
  const { chosenScaffolder } = appContext;

  return (
    <>
    { chosenScaffolder === 'react' ? <ReactScaffolderComponent /> :
    <AngularScaffolderComponent />
    } 
    </>
  )
}

export default ScaffolderComponent