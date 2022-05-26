import { useStore } from '../../stores/appStore';
import AngularScaffolderComponent from '../angular-scaffolder/AngularScaffolderComponent';
import ReactScaffolderComponent from '../react-scaffolder/ReactScaffolderComponent';
import './ScaffolderComponent.css';

const ScaffolderComponent = () => {

  const { chosenScaffolder } = useStore();

  return (
    <>
    { chosenScaffolder === 'react' ? <ReactScaffolderComponent /> :
    <AngularScaffolderComponent />
    } 
    </>
  )
}

export default ScaffolderComponent