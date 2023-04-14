import useForceUpdate from 'use-force-update';
import Session from '../model/Session';
import { Text } from 'react-native-paper';
import StateManager from '../state/StateManager';

/**
 * THIS IS A DEMO COMPONENT
 */

const FormOutput: React.FC = () => {
    const forceUpdate = useForceUpdate()

    StateManager.formSubmitted.subscribe(() => {
        // Note, instead of force updating, a standard useState hook could be used instead
        forceUpdate();
    })

    let text: string | null = Session.instance.formEntry?.getContent();

    return (
        <Text variant="bodyLarge" style={{textAlign: 'center', padding: 20}}>
            {text ?? "Nothing Yet Submitted"}
        </Text>
    );
}

export default FormOutput;